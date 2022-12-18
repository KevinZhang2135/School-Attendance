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
        sorted_array = data_array.copy()

    return sorted_array

def filter_list(data_array: list, *filter_by) -> list:
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
        filter_array = data_array.copy()

    return filter_array

def find_substitute(data_array: list, absent_teacher: str) -> list:
    """returns suitable substitutes for absent teachers"""
    substitutes = []
    periods = []

    # locate periods of the absent teacher
    for row in data_array:
        if row[3] == absent_teacher.lower():
            periods.append(row[-6])

    # finds suitable substitues
    for row in data_array:
        if row[3] != absent_teacher.lower() and row[-6] not in periods:
            substitutes.append(row)

    return substitutes

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
    with Schedule('../schedules/CHS Master Schedule Matrix.csv') as csv_file:
        schedule = Schedule.csv_copy(csv_file)

        # lambda anonymous keys sorts by ascending priority
        #print_table(
        #    sort_list(schedule[1:], lambda x: x[-6]), 
        #    schedule[0]) 

        print_table(
            filter_list(schedule[1:], lambda x: x[3].lower() == "adamou, s."), 
            schedule[0]) 

        print()
        #print_table(
        #    find_substitute(schedule[1:], 'Blacklock, D.'), 
        #    schedule[0])
