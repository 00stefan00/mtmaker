import cherrypy
import importlib
import inspect
import json
import logging
import os
import time
import sys

from utils.filemanager import FileManager


class Main(object):

    def __init__(self, debug):
        self.debug = debug
        self.fileManager = FileManager()

    @cherrypy.expose
    def index(self, **kwargs):
        masterPageContent = None
        masterPageFilePath = os.path.join(self.fileManager.root, "static", "html", "home.html")

        with open(masterPageFilePath, "r") as masterPageFile:
            masterPageContent = masterPageFile.readlines()

        return masterPageContent