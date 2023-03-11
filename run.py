import sys
import os
import logging
import getopt
import cherrypy

from api import Main


def start(argv):
    """
    Sets config parameters and starts the server. This method will be run automaticly when python runs the module.

    :param -p: port, defaults to 8060
    :param -i: ip, defaults to "0.0.0.0"
    """
    port = 8060
    ip = "0.0.0.0"
    debugMode = False
    loggingEnabled = True

    try:
        opts, args = getopt.getopt(argv[1:], "i:p:dl", ["i=", "p=", "d=", "l="])
    except Exception as e:
        logging.error(str(e))
        sys.exit(2)

    for opt in opts:
        if opt[0] == "-i":
            ip = opt[1]
        elif opt[0] == "-p":
            port = opt[1]
        elif opt[0] == "-d":
            debugMode = True
            logging.basicConfig(level=logging.DEBUG)
            logging.info("! Running in debug mode !")
        elif opt[0] == "-l":
            loggingEnabled = False
            logging.info("! Cherrypy logging disabled !")

    _localDir = os.path.abspath(os.path.dirname(__file__))
    conf = {'/': {'tools.staticdir.on': True, 'tools.staticdir.dir': os.path.join(_localDir)}}

    cherrypy.server.socket_port = int(port)
    cherrypy.server.socket_host = ip

    cherrypy.config["tools.encode.on"] = True
    cherrypy.config["tools.encode.encoding"] = "utf-8"
    cherrypy.config.update({'server.socket_host': '0.0.0.0'})
    # cherrypy.config.update({'/images': {'tools.staticdir.on': True, 'tools.staticdir.dir': os.path.join(_localDir, 'static', 'assets', 'missions')}})
    logging.getLogger("cherrypy").propagate = loggingEnabled
    cherrypy.config["log.screen"] = loggingEnabled

    cherrypy.quickstart(Main(debugMode), "/", conf)


if __name__ == '__main__':
    start(sys.argv)
