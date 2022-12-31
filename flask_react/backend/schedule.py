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
                    print(f'{substitute} {period}')#selected_sub[3]

                    break

        else:
            selected_subs.append((None, period))
            print(f'none {period}')

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
        
        print(item, end=((col_sep[i] + 1 - len(str(item))) * ' ') + '|') # nice margins between columns

    print()

    for row in data_array:
        for i, col in enumerate(row):
            print(col, end=((col_sep[i] + 1 - len(str(col))) * ' ') + '|') # nice margins between columns

        print()