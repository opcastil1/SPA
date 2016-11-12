import SocketServer
import json
import random
import math
import time
import datetime
import serial
import os, time
import sys
import threading
import socket
import struct

kwh = 0
ex = 0
kw = 0
kwpeak = 0
pm = 0

class MyTCPServer(SocketServer.ThreadingTCPServer):

    allow_reuse_address = True
    
    


class MyTCPServerHandler(SocketServer.BaseRequestHandler):
    
    def real (self,valor):
    	es = str(kwh)
    	es = es[1:-2]
    	pi = str(kw)
    	pi = pi[1:-2]
    	pm = 0
    	pmx = str(kwpeak)
    	pmx = pmx[1:-2]
    	error = 0
        #error = idd#random.randrange(0,56)
        #ee = current#random.randrange(0,220)
        #es = voltage#random.randrange(1,10)

        print json.dumps({'es':es,'pi':pi,'pm':pm,'pmx':pmx,'error':error})
        self.request.sendall(json.dumps({'es':es,'pi':pi,'pm':pm,'pmx':pmx,'error':error}))

    
       
    def ahora(self,valor):
        
        print valor  


    def handle (self):

        try:
             data = json.loads(self.request.recv(1024).strip()) 

             if data["num"] == 0:
                valor = data["valor"]
                self.real(valor)  

             elif data["num"] == 1:
                valor = data["valor"]
                self.ahora(valor)  
        
        except Exception, e:

                print "-_-", e

        



class Coms:

    def __init__(self):
    	self.ser =serial.Serial(port="/dev/ttyUSB0",baudrate=19200,bytesize=serial.EIGHTBITS,parity=serial.PARITY_NONE,stopbits=serial.STOPBITS_ONE,timeout=1)
    	self.ser.close()
    	self.ser.open()
    	self.p = 0

   
	def readframe(self):
	    buf=b''
	    while (buf == b'' or buf[-1] != b'\x03'):
	        buf+=self.ser.read(1)
	        #print(buf)  
	    return buf

    def readSerial(self):

		global kw
		global kwh
		global kwpeak


		repeat=True
		i = 0
	
		while repeat:
			buf=b''
			past1 = 0
			past2 = 0

			while ((buf == b'' )or (len(buf) <8)):
				past1 = self.ser.read(1) 
				buf +=past1 
				#buf+=self.ser.read(1)

				if (past1 == '\x06' and past2 == '\x00' ):
					buf = ''
					buf=past2
					buf = buf+past1

				past2 = past1

				#print ser.read(1)

			#print ":".join("{:02x}".format(ord(c)) for c in buf)
			#struct.unpack('>f', buf[2:6])

			if(self.p == 0):
				kw = struct.unpack('>f', buf[2:6])
				kw = kw
			#	print "potencia", kw
			elif(self.p == 1):
				kwh = struct.unpack('>L', buf[2:6])
				kwh = kwh
			#	print "energia", kwh
			elif(self.p == 2):
				kwpeak = str(struct.unpack('>f', buf[2:6]))
				kwpeak = kwpeak
			#	print "potencia peak", kwpeak					

			#	print "potencia peak", kwpeak
			#print(buf) 

    def sendSerial(self):
		while True:	
			self.p = 0
			self.ser.write('\x02\x3B\x03\x00\x38\x00\x06\x45\xFA\xCC')
			time.sleep(5)
			self.p = 1
			self.ser.write('\x02\x4E\x06\x00\x20\x20\x20\x20\x98\x5F')
			time.sleep(5)		
			self.p = 2
			self.ser.write('\x02\x3B\x23\x00\x20\x20\x20\x20\x90\x2F')
			time.sleep(5)


x = Coms()
t = threading.Thread(target=x.readSerial)
t.daemon = True
t.start()

t2 = threading.Thread(target=x.sendSerial)
t2.daemon = True
t2.start()


server = MyTCPServer(('localhost', 9000), MyTCPServerHandler)


server.serve_forever()




