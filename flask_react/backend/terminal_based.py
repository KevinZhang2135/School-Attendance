import csv


class Schedule:
    def __init__(self, filepath: str):
        self._filepath = filepath
        self._file = None

    def __enter__(self):
        """automatically opens file"""
        self._file = open(self._filepath)

        csv_file = csv.reader(self._file)

        filearray = []
        for row in csv_file:
            for i, col in enumerate(row):
                try:
                    row[i] = float(col)

                except ValueError:
                    row[i] = col.lower()

            filearray.append(row)

        return filearray

    def __exit__(self, type, value, traceback):
        """automatically closes file after processing """
        self._file.close()


class Menu:
    def __init__(self, schedule):
        self.header = schedule[0]
        self.schedule = schedule[1:]
        self.teachers = {teacher[3] for teacher in self.schedule}

        self.selected_substitues = []
        self.runtime = True

    def main_menu(self):
        response = None
        options = {'show schedule': self.print_schedule,
                   'get substitues': self.get_substitue,
                   'clear substitues': self.clear_substitue,
                   'show substitues': self.show_substitues,
                   'switch substitues': self.swap_substitues,
                   'confirm substitues': self.confirm_substitues,
                   'quit': self.leave}

        print(
            f'Would you like to ( {" | ".join(choice for choice in options)} )')

        while response not in options:
            response = input('Awaiting: ').strip().lower()
            if (not self.selected_substitues
                and (response == 'switch substitues'
                     or response == 'confirm substitues'
                     or response == 'show substitues')):

                response = None
                print('No substitues have been selected yet.')
                print()

        print()
        options[response]()

    def print_schedule(self):
        print_table(sorted(self.schedule, key=lambda x: x[3]), self.header)
        print()

    def get_substitue(self):
        response = None
        options = {'all periods': self.sub_all_periods,
                   'select periods': self.sub_for_period,
                   'select teacher': self.sub_for_teacher,
                   'go back': self.main_menu}

        print(
            f'When is the substitue needed ( {" | ".join(choice for choice in options)} )')

        while response not in options:
            response = input('Awaiting: ').strip().lower()

        print()
        options[response]()

    def sub_all_periods(self):
        periods = [i for i in range(1, 9) if i != 5]

        substitues = find_substitutes(self.schedule, *periods)
        self.selected_substitues.extend(substitues)
        for teacher, period in substitues:
            self.schedule = move_teacher(self.schedule, teacher)

        self.show_substitues()

    def sub_for_period(self):
        response = None
        periods = [str(i) for i in range(1, 9) if i != 5]

        print(
            f'Selecting substitue for period ( {" | ".join(choice for choice in periods)} | go back ) )')

        while response not in periods and response != 'go back':
            response = input('Awaiting: ').strip().lower()

        print()
        if response == 'go back':
            self.get_substitue()

        else:
            substitues = find_substitutes(self.schedule, int(response))
            self.selected_substitues.extend(substitues)
            for teacher, period in substitues:
                self.schedule = move_teacher(self.schedule, teacher)

            self.show_substitues()

    def sub_for_teacher(self):
        response = None
        teacher_name_error = 0
        print('Selecting substitues for teacher ( enter teacher name | see teacher list | go back )')

        while response not in self.teachers and response != 'go back':
            response = input('Awaiting: ').strip().lower()

            if response == 'see teacher list':
                col_sep = 0  # gets longest teacher name
                for teacher in self.teachers:
                    if col_sep < len(teacher):
                        col_sep = len(teacher)

                col = 0
                for teacher in sorted(self.teachers):
                    print(f'|{teacher.title()}', end=(
                        col_sep - len(teacher) + 1)*' ')

                    col += 1
                    if col >= 8:
                        col = 0
                        print()

                print()
                print(
                    'Selecting substitues for teacher ( enter teacher name | see teacher list | go back )')

            elif response != 'go back' and response not in self.teachers:
                response = None
                teacher_name_error += 1

                print('The teacher is not in the schedule list.')
                if teacher_name_error >= 3:
                    print(
                        'Please use "see teacher list" to see the catalog of all teacher names.')

                print()

        print()
        if response in self.teachers:
            # finds teachers who are not the absent teacher
            periods = [subject[-6] for subject in filter_list(
                self.schedule,
                lambda x: x[3] == response.lower())]

            candidates = filter_list(
                self.schedule,
                lambda x: x[3] != response.lower())

            substitues = find_substitutes(candidates, *periods)
            self.selected_substitues.extend(substitues)
            for teacher, period in substitues:
                self.schedule = move_teacher(self.schedule, teacher)

            self.show_substitues()

        else:
            self.get_substitue()

    def clear_substitue(self):
        self.selected_substitues = []

    def show_substitues(self):
        for teacher, period in sorted(self.selected_substitues, key=lambda x: x[1]):
            print(f'"{teacher.title()}" for period {period}')

        print()

    def swap_substitues(self):
        pass

    def confirm_substitues(self):
        response = None
        teacher_name_error = 0
        options = [teacher[0] for teacher in self.selected_substitues]

        print('Which teacher would you like to confirm: ')
        for teacher, period in self.selected_substitues:
            print(f'"{teacher.title()}" for period {period}')

        print('confirm all')
        print('go back')
        print()

        while response not in options and response != 'confirm all' and response != 'go back':
            response = input('Awaiting: ').strip().lower()
            if response != 'confirm all' and response != 'go back':
                teacher_name_error += 1

                print('The teacher is not in substitues.')
                if teacher_name_error >= 3:
                    print(
                        "Please use enter only the teacher's name within the quotes.")

                print()

        if response == 'go back':
            self.main_menu()

        else:
            if response == 'confirm all':
                with open(FILEPATH, 'w', newline='') as csvfile:
                    new_schedule = csv.writer(csvfile)
                    # sorts by period
                    for teacher, period in sorted(self.selected_substitues, key=lambda x: x[1]):
                        self.schedule = move_teacher(self.schedule, teacher)
                        self.selected_substitues.pop(
                            self.selected_substitues.index((teacher, period)))
                        print(
                            f'"{teacher.title()}" has been successfully confirmed for period {period}.')

                    new_schedule.writerow(self.header)
                    for row in self.schedule:
                        new_schedule.writerow(row)

                print()

            else:  # individually confirming teachers
                with open(FILEPATH, 'w', newline='') as csvfile:
                    new_schedule = csv.writer(csvfile)
                    # sorts by period
                    for teacher, period in sorted(self.selected_substitues, key=lambda x: x[1]):
                        if teacher == response:
                            substitue = teacher, period
                            break

                    self.schedule = move_teacher(self.schedule, response)
                    self.selected_substitues.pop(
                        self.selected_substitues.index(substitue))

                    new_schedule.writerow(self.header)
                    for row in self.schedule:
                        new_schedule.writerow(row)

                print(
                    f'"{teacher}" has been successfully confirmed for period {period}.')
                print()

    def leave(self):
        self.runtime = False

    def run(self):
        while self.runtime:
            self.main_menu()

        print('Thank you')


def sort_list(data_array: list, *sort_by) -> list:
    """sorts data by ascending priority of parameters"""
    data_array = data_array.copy()
    sort_by = list(sort_by)
    sorted_array = []

    # recursion sort until parameters are empty
    if len(sort_by) > 0:
        floats = []
        strings = []

        # sorts strings and floats separately
        for row in data_array:
            if type(sort_by[0](row)) is float:
                floats.append(row)

            else:
                strings.append(row)

        floats.sort(key=sort_by[0])
        strings.sort(key=sort_by[0])

        sorted_array = floats + strings
        sort_by.pop(0)

        sorted_array = sort_list(sorted_array, *sort_by)

    else:
        sorted_array = data_array

    return sorted_array


def filter_list(data_array: list, *filter_by) -> list:
    data_array = data_array.copy()
    filter_by = list(filter_by)
    filter_array = []

    # recursion filter until parameters are empty
    if len(filter_by) > 0:
        for row in data_array:
            if (filter_by[0](row)):
                filter_array.append(row)

        filter_by.pop(0)
        filter_array = filter_list(filter_array, *filter_by)

    else:
        filter_array = data_array

    return filter_array


def find_substitutes(candidates: list, *periods) -> list:
    """returns a list of suitable substitutes and their periods for absent teachers"""
    # locate periods of the absent teacher
    candidates = candidates.copy()
    selected_subs = []

    for period in periods:
        if len(candidates) > 0:
            for substitute in candidates:
                # finds teachers who are not teaching during the absent periods
                if substitute[-6] == period:
                    # finds other periods the teacher may also be in
                    for selected_sub in filter_list(candidates, lambda x: x[3] == substitute[3]):
                        candidates.pop(candidates.index(selected_sub))

                    selected_subs.append((selected_sub[3], period))

                    break

        else:
            selected_subs.append((None, period))

    return selected_subs


def move_teacher(data_array: list, teacher: str):
    """moves teachers to the end of the schedule list"""
    data_array = data_array.copy()
    for period in filter_list(data_array, lambda x: x[3] == teacher):
        data_array.pop(data_array.index(period))
        data_array.append(period)

    return data_array


def swap_teachers(data_array: list, to_swap: str, target: str):
    """swaps two teachers within the schedule list"""
    swap_periods = filter_list(
        data_array,
        lambda x: x[3] == to_swap.lower())

    # finds first the occurrence of to swap period
    swap_index = len(data_array)
    for period in swap_periods:
        if data_array.index(period) < swap_index:
            swap_index = data_array.index(period)

    target_periods = filter_list(
        data_array,
        lambda x: x[3] == target.lower())

    # finds first the occurrence of target period
    target_index = len(data_array)
    for period in target_periods:
        if data_array.index(period) < target_index:
            target_index = data_array.index(period)

    # switches values in case so the greater index is the target periods
    if swap_index > target_index:
        swap_index, target_index = target_index, swap_index
        swap_periods, target_periods = target_periods, swap_periods

    # swapping
    swapped_array = filter_list(
        data_array,
        lambda x: x not in swap_periods and x not in target_periods)

    for period in target_periods:
        swapped_array.insert(swap_index, period)

    for period in swap_periods:
        swapped_array.insert(target_index + len(target_periods), period)

    return swapped_array


def print_table(data_array: list, header: list):
    """prints 2d arrays are a table"""
    # finds longest characters
    col_sep = [0] * len(header)
    for row in data_array:
        for i, col in enumerate(row):
            if len(str(col)) > col_sep[i]:
                col_sep[i] = len(str(col))

    for i, item in enumerate(header):
        # finds longest characters
        if len(str(item)) > col_sep[i]:
            col_sep[i] = len(str(item))

        # nice margins between columns
        print(f'|{item.title()}', end=(
            (col_sep[i] + 1 - len(str(item))) * ' '))  # prints headers

    print()

    for row in data_array:
        for i, col in enumerate(row):
            # nice margins between columns
            print(f'|{col}', end=((col_sep[i] + 1 - len(str(col))) * ' '))

        print()


if __name__ == "__main__":
    FILEPATH = 'schedules/test.csv'

    # retrieves csv from filepath string as a 2d array
    with Schedule(FILEPATH) as csv_file:
        print('Welcome')
        menu = Menu(csv_file)
        menu.run()

        #find_substitutes(schedule[1:], 'Blacklock, D.')
        #schedule.insert(0, header)
