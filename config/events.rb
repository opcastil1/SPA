WebsocketRails::EventMap.describe do
  namespace :graficos do
    subscribe :linea, :to => GraficosController, :with_method => :lineadata
    subscribe :real, :to => GraficosController, :with_method => :realdata
  end
end