@photographs.each do |photograph|
  json.set! photograph.id do
    json.partial! 'photograph', photograph: photograph
  end
end