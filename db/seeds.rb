# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user = User.create(email: "brentvale@gmail.com", password: "password")

TimelapseHub.create(user_id: user.id, latitude: "37.4216" , longitude: "-121.7607", hub_name: "Chicken Coop Front Door" )
TimelapseHub.create(user_id: user.id, latitude: "37.421694" , longitude: "-121.759279", hub_name: "Main House Deck" )
TimelapseHub.create(user_id: user.id, latitude: "37.432459" , longitude: "-121.762322", hub_name: "Two Fence Posts" )
TimelapseHub.create(user_id: user.id, latitude: "37.425561" , longitude: "-121.758984", hub_name: "Valley View" )
