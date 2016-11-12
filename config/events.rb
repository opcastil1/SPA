WebsocketRails::EventMap.describe do
  namespace :graficos do
    subscribe :vista1, :to => GraficosController, :with_method => :vista1
    subscribe :vista2, :to => GraficosController, :with_method => :vista2
    subscribe :vista3, :to => GraficosController, :with_method => :vista3
    subscribe :datos1, :to => DatosController, :with_method => :datos11
    subscribe :datos2, :to => DatosController, :with_method => :datos22
    subscribe :datos3, :to => DatosController, :with_method => :datos33
    subscribe :configuracion, :to => DatosController, :with_method => :configuracion
    subscribe :guardaruno, :to => DatosController, :with_method => :guardaruno
    subscribe :guardardos, :to => DatosController, :with_method => :guardardos
    subscribe :guardartres, :to => DatosController, :with_method => :guardartres
    subscribe :guardartiempo, :to => VariablesController, :with_method => :guardartiempo
    subscribe :tiempovista, :to => VariablesController, :with_method => :tiempovista
    subscribe :guardarsic, :to => VariablesController, :with_method => :guardarsic
    subscribe :tiemposic, :to => VariablesController, :with_method => :tiemposic
    subscribe :guardartarifa, :to => VariablesController, :with_method => :guardartarifa
    subscribe :tiempotarifa, :to => VariablesController, :with_method => :tiempotarifa
    subscribe :semaforo, :to => SemaforoController, :with_method => :semaforo
    subscribe :descargadatos, :to => DescargaController, :with_method => :descargadatos
  end
end