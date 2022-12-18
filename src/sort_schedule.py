import csv

class Schedule:
    def __init__(self, filepath: str):
        self._filepath = filepath
        self._file = None

    def __enter__(self):
        """automatically opens file"""
        self._file = open(self._filepath)

        csv_file = csv.reader(self._file)
        return csv_file

    def __exit__(self, type, value, traceback):
        """automatically closes file after processing """
        self._file.close()

    @staticmethod
    def csv_copy(csv_file: csv) -> list:
        """formats csv file"""
        filearray = []
        for row in csv_file:
            for i, col in enumerate(row):
                try:
                    row[i] = float(col)

                except ValueError:
                    row[i] = col.lower()

            filearray.append(row)

        return filearray

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

def find_substitutes(data_array: list, absent_teacher: str):
    """returns suitable substitutes for absent teachers"""
    # locate periods of the absent teacher
    data_array = data_array.copy()
    periods = [subject[-6] for subject in filter_list(
        data_array, 
        lambda x: x[3] == absent_teacher.lower())]

    print(periods)

    # finds suitable substitues
    candidates = filter_list(
        data_array, 
        lambda x: x[3] != absent_teacher.lower() and x[-6] not in periods)

    for period in sorted(periods):
        if len(candidates) > 0:
            for i, substitute in enumerate(candidates):
                if substitute[-6] != period:
                    for selected_sub in filter_list(data_array, lambda x: x[3] == substitute[3]):
                        data_array.pop(data_array.index(selected_sub))
                        data_array.append(selected_sub)

                    candidates.pop(i)
                    print(f'{selected_sub} {period}')
                break

        else:
            print(f'none {period}')
    
    return data_array

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
        
        print(item, end=((col_sep[i] + 1 - len(str(item))) * ' ') + '|') # nice margins between columns

    print()

    for row in data_array:
        for i, col in enumerate(row):
            print(col, end=((col_sep[i] + 1 - len(str(col))) * ' ') + '|') # nice margins between columns

        print()

# only executes in main file
# retrieves csv from filepath string as a 2d array
if __name__ == "__main__":
    filepath = '../schedules/test.csv'
    with Schedule(filepath) as csv_file:
        schedule = Schedule.csv_copy(csv_file)
        header = schedule[0]
        schedule = find_substitutes(schedule[1:], 'Blacklock, D.')
        schedule.insert(0, header)

    with open(filepath, 'w', newline='') as csvfile:    
        new_schedule = csv.writer(csvfile)
        for row in schedule:
            new_schedule.writerow(row)




