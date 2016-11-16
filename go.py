import os, os.path
import sys
import random
import string
import glob

import cherrypy

sys.path.append("/Users/harrison/coatjava-2.4/lib/clas/coat-libs-2.4-SNAPSHOT.jar")

from org.root.histogram import H1D
from org.root.group import TDirectory
from org.root.pad import TImageCanvas
from java.util import Base64



class webMon(object):
    hipoFilenameString = "";

    @cherrypy.expose
    def index(self):
        return open('index.html')

    @cherrypy.expose
    def plot2base64img(self, dirName, name):
        myDir = TDirectory()
        myDir.readHipo(self.hipoFilenameString)
        myHist = myDir.getDirectory(dirName).getObject(name)
        myCan = TImageCanvas("myCan", "myCan", 600, 400, 1, 1)
        myCan.cd(0)
        myCan.draw(myHist)
        return "data:image/png;base64," + Base64.getEncoder().encodeToString(myCan.getCanvasImage())

    @cherrypy.expose
    def getDirStructureString(self):
        myDir = TDirectory()
        myDir.readHipo(self.hipoFilenameString)
        return myDir.toString()

    @cherrypy.expose
    def getListOfFiles(self):
        fileList = glob.glob("public/hipoFiles/*.hipo")
        fileString = ""
        for k in fileList:
            fileString = k + "," + fileString
        return fileString # returns a single string of filenames separated by a comma

    @cherrypy.expose
    def setFile(self, fullPath):
        self.hipoFilenameString = fullPath



if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }
    cherrypy.quickstart(webMon(), '/', conf)
