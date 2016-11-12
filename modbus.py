import serial
import re
import threading
from time import sleep

ser =serial.Serial(port="/dev/ttyUSB1",baudrate=9600,bytesize=serial.SEVENBITS,parity=serial.PARITY_EVEN,stopbits=serial.STOPBITS_ONE,timeout=1)
size = 65
obis = ["" for x in range(size)]
values = ["" for x in range(size)]

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


def setObisValue(s):
	i1 = s.find("(")
	i2 = s.find(")")
	obs = s[0:i1]
	vals = s[i1+1:i2]
	#print "hola s"
	if(i1>1 and i2 >i1):

		#print "hola d"
		if (obs[0] == ""):
			obs = obs[1:]
			#print s
		for x in xrange(size):
			if (obs == obis[x]):
				values[x] = vals
				print "El obis es "+obis[x]+" y su valor "+values[x]

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
		i = i+1
	    #ser.setBaudrate(300)
	    #  
	    #ser.write(b'/?!\r\n')
	    #ser.write(b'.000\r\n')    
		buf=b''
		while ((buf == b'' )or (buf[-1] != b'\x03' and buf[-1] != '\n')):
			buf+=ser.read(1)
			#print ser.read(1)

		setObisValue(buf)
		#buf +=" "
		#buf +=str(i)
		print(buf) 
		    #ser.write('/?!\r\n')
	    #response=ser.readline()
	    #pattern = re.compile(r'/(...)(\d)\\@(.*)')
	    #m=pattern.match(response.decode("ASCII"))
	    #print(response)
	    

	    #if not m:
	    #    repeat= True
	    #else: repeat=False
		#	#ser.write("\x01\x50\x32\x02\x28\x32\x35\x43\x38\x29\x03\x1e") 

def sendSerial():
	#sleep(1)
	#ser.write('/?!\r\n')
	#sleep(2)
	#ser.write('\x06\x30\x35\x31\x0D\x0A')
	#sleep(2)
	#ser.write('\x01\x50\x31\x02\x28\x30\x30\x30\x30\x30\x30\x30\x30\x29\x03\x61') #password
	#sleep(2)
	#mm = "\x7E\xA0\x19\x95\x75\x54\x68\x35\xE6\xE6\x00\xC0\x01\x81\x00\x08\x00\x00\x01\x00\x00\xFF\x01\x00\x0D\xFD\x7E"
	#mm = "004\r\n"
	while True:	
		ser.write('/?!\r\n')
		sleep(10)
		ser.write('/2!\r\n')
		sleep(10)
		#ser.write('/?000!')
		#ser.write('\x06\x30\x35\x31\x0D\x0A')
		#sleep(2)
		#ser.write('\x01\x52\x31\x02\x30\x30\x30\x30\x30\x30\x33\x34\x28\x29\x03\x64')
		#print '\x01\x52\x35\x02\x33\x32\x2E\x37\x2E\x30\x28\x29\x03\x61'
		
		#ser.write('\x01\x52\x35\x02\x33\x31\x2E\x37\x2E\x30\x28\x29\x03\x62')
		
		#ser.write('\x01\x52\x35\x02\x50\x2E\x30\x31\x28\x3B\x29\x03\x23') 
		#ser.write('\x06000\r\n')
		#sleep(2)
		#ser.write(mm)
		#print mm
		#sleep(2)
		#ser.write('/?!\r\n')

		

t = threading.Thread(target=readSerial)
t.start()
sendSerial()


#manufacturer,speed,version=m.group(1,2,3)
#speedcode=int(speed)
#baudrates=(300,600,1200,2400,4800,9600,19200)
#s=bytes([6,48,48+speedcode,48,13,10])  #option request data readout mode
#print(s)
#ser.write(s)
#sleep(1)
#ser.flush()
##ser.close()
##ser =serial.Serial(port=PORT,baudrate=baudrates[speedcode],bytesize=7,parity='E',stopbits=1,timeout=5)
#ser.setBaudrate(9600)
##sleep(1)
##ser.setTimeout=None
#frame=readframe()


ser.close()