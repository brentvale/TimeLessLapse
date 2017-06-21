@hubs.each do |hub|
  json.set! hub.id do
    json.partial! 'hub', hub: hub, photographs: @photographs[hub.id]
  end
end