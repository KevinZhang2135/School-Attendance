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

def sortList(data_array: list, *sortBy) -> list:
    """sorts data by ascending priority of parameters"""
    sortBy = list(sortBy)
    sortedArray = []

    # recursion sort  unti parameters are empty
    if len(sortBy) > 0:
        floats = []
        strings = []

        # sorts strings and floats separately
        for row in data_array:
            if type(sortBy[0](row)) is float:
                floats.append(row)

            else:
                strings.append(row)

        floats.sort(key=sortBy[0])
        strings.sort(key=sortBy[0])

        sortedArray = floats + strings
        sortBy.pop(0)

        sortedArray = sortList(sortedArray, *sortBy)

    else:
        sortedArray = data_array.copy()

    return sortedArray

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
    col_sep = [0] * len(header)
    for row in data_array:
        for i, col in enumerate(row):
            if len(str(col)) > col_sep[i]:
                col_sep[i] = len(str(col))

    for i, item in enumerate(header):
        if len(str(item)) > col_sep[i]:
            col_sep[i] = len(str(item))
        
        print(item, end=((col_sep[i] + 1 - len(str(item))) * ' ') + '|')

    print()

    for row in data_array:
        for i, col in enumerate(row):
            print(col, end=((col_sep[i] + 1 - len(str(col))) * ' ') + '|')

        print()

# only executes in main file
# retrieves csv from filepath string as a 2d array
if __name__ == "__main__":
    with Schedule('../schedules/CHS Master Schedule Matrix.csv') as csv_file:
        schedule = Schedule.csv_copy(csv_file)

        # lambda anonymous keys sorts by ascending priority
        print_table(
            sortList(schedule[1:], lambda x: x[-6]), 
            schedule[0]) 

        print()
        print_table(
            find_substitute(schedule[1:], 'Blacklock, D.'), 
            schedule[0])
