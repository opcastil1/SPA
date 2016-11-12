# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161115054162) do

  create_table "estaticos", force: :cascade do |t|
    t.integer  "año"
    t.integer  "mes"
    t.integer  "dia"
    t.integer  "hora"
    t.integer  "minuto"
    t.integer  "a"
    t.integer  "b"
    t.decimal  "c"
    t.decimal  "d"
    t.decimal  "e"
    t.integer  "f"
    t.integer  "h"
    t.integer  "i"
    t.decimal  "j"
    t.decimal  "k"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal  "l"
    t.decimal  "m"
    t.decimal  "n"
  end

  create_table "inversors", force: :cascade do |t|
    t.integer  "año"
    t.integer  "mes"
    t.integer  "dia"
    t.integer  "hora"
    t.integer  "minuto"
    t.integer  "energiaacum"
    t.integer  "pi"
    t.integer  "pm"
    t.integer  "pmx"
    t.integer  "error"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "medidors", force: :cascade do |t|
    t.integer  "año"
    t.integer  "mes"
    t.integer  "dia"
    t.integer  "hora"
    t.integer  "minuto"
    t.integer  "energiaacum"
    t.integer  "fp"
    t.integer  "pi"
    t.integer  "pm"
    t.integer  "pmx"
    t.integer  "v1"
    t.integer  "v2"
    t.integer  "v3"
    t.integer  "error"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "mesanterior", force: :cascade do |t|
    t.integer "enero"
    t.integer "febrero"
    t.integer "marzo"
    t.integer "abril"
    t.integer "mayo"
    t.integer "junio"
    t.integer "julio"
    t.integer "agosto"
    t.integer "septiembre"
    t.integer "octubre"
    t.integer "noviembre"
    t.integer "diciembre"
  end

  create_table "valores", force: :cascade do |t|
    t.integer  "año"
    t.integer  "mes"
    t.integer  "dia"
    t.integer  "hora"
    t.integer  "es"
    t.integer  "ee"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "minuto"
    t.decimal  "tarifa"
    t.decimal  "co2"
  end

end
