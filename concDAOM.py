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

kwh = 0
fpm = 0
kw = 0
vl1 = 0
vl2 = 0
vl3 = 0 
ex = 0

size = 65

obis = ["" for x in range(size)]

obis[0] = "0.9.2"
obis[1] = "0.9.1"
obis[2] = "1.8.0"
obis[3] = "1.8.0*04"
obis[4] = "1.8.0&03"
obis[5] = "3.8.0"
obis[6] = "3.8.0*04"
obis[7] = "3.8.0&03"
obis[8] = "2.8.0"
obis[9] = "2.8.0*04"
obis[10]= "2.8.0&03"
obis[11]= "4.8.0"
obis[12]= "4.8.0*04"
obis[13]= "4.8.0&03"
obis[14]= "1.6.2"
obis[15]= "1.6.2*04"
obis[16]= "1.6.2&03"
obis[17]= "1.6.2"
obis[18]= "1.6.2"
obis[19]= "1.2.2"
obis[20]= "1.2.2*04"
obis[21]= "1.2.2&03"
obis[22]= "1.6.1"
obis[23]= "1.6.1*04"
obis[24]= "1.6.1&03"
obis[25]= "1.6.1"
obis[26]= "1.6.1*04"
obis[27]= "1.6.1&03"
obis[28]= "1.6.1"
obis[29]= "1.6.1*04"
obis[30]= "1.6.1&03"
obis[31]= "1.2.1"
obis[32]= "1.2.1*04"
obis[33]= "1.2.1&03"
obis[34]= "0.1.0"
obis[35]= "C.61"
obis[36]= "C.71"
obis[37]= "32.7.0"
obis[38]= "52.7.0"
obis[39]= "72.7.0"
obis[40]= "31.7.0"
obis[41]= "51.7.0"
obis[42]= "71.7.0"
obis[43]= "1.7.0"
obis[44]= "21.7.0"
obis[45]= "41.7.0"
obis[46]= "61.7.0"
obis[47]= "2.7.0"
obis[48]= "22.7.0"
obis[49]= "42.7.0"
obis[50]= "62.7.0"
obis[51]= "3.7.0"
obis[52]= "23.7.0"
obis[53]= "43.7.0"
obis[54]= "63.7.0"
obis[55]= "4.7.0"
obis[56]= "24.7.0"
obis[57]= "44.7.0"
obis[58]= "64.7.0"
obis[59]= "13.7.0"
obis[60]= "33.7.0"
obis[61]= "53.7.0"
obis[62]= "73.7.0"
obis[63]= "13.7.0"
obis[64]= "14.7"


class MyTCPServer(SocketServer.ThreadingTCPServer):

    allow_reuse_address = True
    
    


class MyTCPServerHandler(SocketServer.BaseRequestHandler):
    
    def real (self,valor):
    	es = float(kwh[0:-4])*50
    	fp = fpm
    	pi = float(kw[0:-3])*50
    	pm = 0
    	pmx = 0
    	v1 = vl1
    	v2 = vl2
    	v3 = vl3
    	error = ex
        #error = idd#random.randrange(0,56)
        #ee = current#random.randrange(0,220)
        #es = voltage#random.randrange(1,10)

        print json.dumps({'es':es,'fp':fp,'pi':pi,'pmx':pmx,'v1':v1,'v2':v2,'v3':v3,'error':error})
        self.request.sendall(json.dumps({'es':es,'fp':fp,'pi':pi,'pmx':pmx,'v1':v1,'v2':v2,'v3':v3,'error':error}))

    
       
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
    	self.ser =serial.Serial(port="/dev/ttyUSB1",baudrate=9600,bytesize=serial.SEVENBITS,parity=serial.PARITY_EVEN,stopbits=serial.STOPBITS_ONE,timeout=1)
    	self.ser.close()
    	self.ser.open()
    	self.size = 65
    	self.values = ["" for x in range(size)]

    def setObisValue(self,s):
		i1 = s.find("(")
		i2 = s.find(")")
		obs = s[0:i1]
		vals = s[i1+1:i2]
		global kwh
		global fpm
		global kw
		global vl1
		global vl2
		global vl3
		global ex
		#print "hola s"
		if(i1>1 and i2 >i1):

			#print "hola d"
			if (obs[0] == ""):
				obs = obs[1:]
				#print s
			for x in xrange(size):
				if (obs == obis[x]):
					self.values[x] = vals
					if(x == 59):
						fpm = vals
					elif(x == 2):
						kwh = vals
					elif(x == 43):
						kw = vals
					elif(x == 37):
						vl1 = vals
					elif(x == 38):
						vl2 = vals
					elif(x == 39):
						vl3 = vals
					elif(x == 39):
						vl3 = vals
					else:
						ex = 0

					#print "El obis es "+obis[x]+" y su valor "+self.values[x]

    def readframe(self):
        buf=b''
        while (buf == b'' or buf[-1] != b'\x03'):
            buf+=self.ser.read(1)
            #print(buf)  
        return buf

    def readSerial(self):
        repeat=True
        i = 0
        while repeat:
            i = i+1
            buf=b''
            while ((buf == b'' )or (buf[-1] != b'\x03' and buf[-1] != '\n')):
                buf+=self.ser.read(1)
            
            self.setObisValue(buf)
            #print(buf) 


    def sendSerial(self):
        while True:	
            self.ser.write('/?!\r\n')
            time.sleep(10)
            self.ser.write('/2!\r\n')
            time.sleep(10)



x = Coms()
t = threading.Thread(target=x.readSerial)
t.daemon = True
t.start()

t2 = threading.Thread(target=x.sendSerial)
t2.daemon = True
t2.start()

server = MyTCPServer(('localhost', 8000), MyTCPServerHandler)


server.serve_forever()




