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

    # recursion sort unti parameters are empty
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

def filter(data_array: list, filter) -> list:
    candidates = []
    for row in data_array:
        print(filter(row))
        if filter(row):
            candidates.append(row)

    return candidates

#def exclude()

# only executes in main file
# retrieves csv from filepath string as a 2d array
if __name__ == "__main__":
    with Schedule('../schedules/CHS Master Schedule Matrix.csv') as csv_file:
        schedule = Schedule.csv_copy(csv_file)

        # lambda anonymous keys sorts by ascending priority
        #for subject in sortList(schedule[1:4], lambda x: x[-2], lambda x: x[3][0]):
        #    print(subject)

        absent = "adamou, s."
        for subject in filter(schedule[1:4]):
            print(subject)
