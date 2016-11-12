class WelcomeController < ApplicationController
require 'socket'
  # GET /welcome
  def index

  end

  def data
 

 send_file(
    "#{Rails.root}/db/development.sqlite3",
    filename: "basededatos.sqlite3",
    type: "application/sqlite3"
  )


  end

  def log
 

 send_file(
    "#{Rails.root}/log/development.log",
    filename: "log.txt",
    type: "application/txt"
  )


  end
  def real

  

  end

  def uno

  

  end

 def dos

  

  end

 def tres

  

  end

  def configuracion

  

  end


end
