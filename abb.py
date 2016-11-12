import serial
import re
import threading
import struct
from time import sleep
import math

ser =serial.Serial(port="/dev/ttyUSB0",baudrate=19200,bytesize=serial.EIGHTBITS,parity=serial.PARITY_NONE,stopbits=serial.STOPBITS_ONE,timeout=1)
p = 0
kwh = 0
kw = 0
kwpeak = 0
def readframe():
    buf=b''
    while (buf == b'' or buf[-1] != b'\x03'):
        buf+=ser.read(1)
        print(buf)  
    return buf

def readSerial():

	repeat=True
	i = 0

	while repeat:
		
		buf=b''
		past1 = 0
		past2 = 0
		while ((buf == b'' )or (len(buf) <8)):
			past1 = ser.read(1) 
			buf +=past1
			#if (past1 == '\x01' and past2 == '\x60'):
			#	buf = buf-past1
			#	buf = buf-past2
				

			past2 = past1

			#print ser.read(1)

		print len( buf[2:6])
		#struct.unpack('>f', buf[2:6])
		if(p == 0):
			kw = (struct.unpack('>f', buf[2:6]))
			print "potencia", kw
		elif(p == 1):
			kwh = struct.unpack('>L', buf[2:6])
			print "energia", kwh

		print(buf) 
		
def sendSerial():
	global p
	while True:
		ser.close()
		ser.open()	
		p = 0
		ser.write('\x02\x3B\x03\x00\x38\x00\x06\x45\xFA\xCC')
		sleep(2)
		p = 1
		ser.write('\x02\x4E\x06\x00\x20\x20\x20\x20\x98\x5F')
		sleep(2)		
		ser.close()

		
		

t = threading.Thread(target=readSerial)
t.start()
sendSerial()



ser.close()