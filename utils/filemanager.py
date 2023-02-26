import json
import logging
import os
import sys


class FileManager(object):

    def __init__(self):
        self.root = os.path.dirname(sys.modules['__main__'].__file__)

    def getJsonFromFile(self, file):
        try:
            return json.loads(open(os.path.join(self.root, file), 'r', encoding='utf-8').read())
        except Exception as e:
            logging.warning("cannot read file: '{0}', {1}".format(file, str(e)))
            return {}

        return returnValue
