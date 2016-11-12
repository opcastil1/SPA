import SocketServer
import json
import random
import math
import time 
i = 0;

class MyTCPServer(SocketServer.ThreadingTCPServer):

    allow_reuse_address = True
    
    


class MyTCPServerHandler(SocketServer.BaseRequestHandler):
    
    def real (self,valor):
          
        ano = 2016
        mes = random.randrange(1,12)
        dia = random.randrange(1,31)
        hora = random.randrange(1,24)
        es = random.randrange(0,220)
        fp = random.randrange(0,56)
        pi = random.randrange(0,56)
        pm = random.randrange(0,56)
        pmx = random.randrange(0,56)
        v1 = random.randrange(0,56)
        v2 = random.randrange(0,56)
        v3 = random.randrange(0,56)
        error = random.randrange(1,10)
        self.request.sendall(json.dumps({'ano':ano,'mes':mes,'dia':dia,'hora':hora,'es':es,'fp':fp,'pi':pi,'pm':pm,'pmx':pmx,'v1':v1,'v2':v2,'v3':v3,'error':error}))
       
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

        
    

server = MyTCPServer(('localhost', 8000), MyTCPServerHandler)


server.serve_forever()



