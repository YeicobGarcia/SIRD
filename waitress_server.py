# Example class to start a Waitress server as a windows service
# the specific use case is running Waitress as a windows server using pywin32
# The Waitress docs only show how to use waitress-serve, but since waitress-serve is blocking
# you don't get a return value, which makes it impossible to gracefully stop the Waitress server
# from a windows service
# However, looking at the waitress-serve code, it's easy to write a custom class



from waitress.server import create_server
#import your flask app

class WaitressServer:

	def __init__(self, host, port):
		self.server = create_server(flask.app, host=host, port=port)

    # call this method from your service to start the Waitress server
	def run(self):
		self.server.run()

    # call this method from the services stop method
	def stop_service(self):
		self.server.close()
		
#-------------------------------------------------------------------------

# example pywin32 windows service: https://gist.github.com/drmalex07/10554232
import win32serviceutil
import win32service
import win32event
import servicemanager
import socket
import time
import logging

logging.basicConfig(
    filename = 'c:\\Temp\\hello-service.log',
    level = logging.DEBUG, 
    format = '[helloworld-service] %(levelname)-7.7s %(message)s'
)

class HelloWorldSvc (win32serviceutil.ServiceFramework):
    _svc_name_ = "HelloWorld-Service"
    _svc_display_name_ = "HelloWorld Service"
    
    def __init__(self,args):
        win32serviceutil.ServiceFramework.__init__(self,args)
        self.stop_event = win32event.CreateEvent(None,0,0,None)
        socket.setdefaulttimeout(60)
        self.stop_requested = False

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.stop_event)
        logging.info('Stopping service ...')
        self.stop_requested = True

    def SvcDoRun(self):
        servicemanager.LogMsg(
            servicemanager.EVENTLOG_INFORMATION_TYPE,
            servicemanager.PYS_SERVICE_STARTED,
            (self._svc_name_,'')
        )
        self.main()

    def main(self):
        logging.info(' ** Hello PyWin32 World ** ')
        # Simulate a main loop
        for i in range(0,50):
            if self.stop_requested:
                logging.info('A stop signal was received: Breaking main loop ...')
                break
            time.sleep(5)
            logging.info("Hello at %s" % time.ctime())
        return

if __name__ == '__main__':
    win32serviceutil.HandleCommandLine(HelloWorldSvc)