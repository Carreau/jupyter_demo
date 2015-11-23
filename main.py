"""
Copyright (c) 2015 Phosphor Contributors
Distributed under the terms of the BSD 3-Clause License.
The full license is in the file LICENSE, distributed with this software.
"""
import subprocess
import sys
import webbrowser

import tornado.httpserver
import webbrowser
import tornado.web


class MainPageHandler(tornado.web.RequestHandler):

    def get(self):
        return self.render("index.html", static=self.static_url)


PORT = 8890

import os.path


ssl_options = {
    "certfile": os.path.expanduser("~/.ssh/mycert.crt"),
    "keyfile": os.path.expanduser("~/.ssh/mycert.pem"),
}


def main(argv):

    url = "https://localhost:{}".format(PORT)

    handlers = [
        (r"/", MainPageHandler),
        (r'/(.*)', tornado.web.StaticFileHandler,
         {'path': '.'}),
        (r'/components/font-awesome/fonts/(.*)', tornado.web.StaticFileHandler,
         {'path': './components/font-awesome/fonts/'}),
    ]

    nb_command = [sys.executable, '-m', 'notebook', '--no-browser',
                  '--NotebookApp.allow_origin="%s"' % url]
    nb_server = subprocess.Popen(nb_command, stderr=subprocess.STDOUT,
                                 stdout=subprocess.PIPE)

    # wait for notebook server to start up
    while 1:
        line = nb_server.stdout.readline().decode('utf-8').strip()
        if not line:
            continue
        print(line)
        if 'The IPython Notebook is running at: https://localhost:8888/':
            break
        if 'Control-C' in line:
            raise ValueError(
                'The port 8888 was already taken, kill running notebook servers'
            )

    app = tornado.web.Application(handlers, static_path='build',
                                  template_path='.')

    http_server = tornado.httpserver.HTTPServer(app, ssl_options=ssl_options)
    loop = tornado.ioloop.IOLoop.instance()
    try:
        http_server.listen(PORT, 'localhost')
        webbrowser.open('https://localhost:{}'.format(PORT))
    #loop.add_callback(webbrowser.open, url)
        loop.start()
    except KeyboardInterrupt:
        print(" Shutting down on SIGINT")
    finally:
        nb_server.kill()
        loop.close()

if __name__ == '__main__':
    main(sys.argv)

