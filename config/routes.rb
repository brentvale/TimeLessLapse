Rails.application.routes.draw do
  namespace :api do
  get 'photographs/create'
  end

  resources :timelapse_hubs, only: [:index, :new, :create, :show]

  resources :photographs, only: [:new, :create, :edit, :update] do
    member do
      get 'set_location'
    end
  end
  
  namespace :api do 
    resources :photographs, only: [:create, :index]
  end
  
  get "static_pages/new_hub_instructions", to: "static_pages#new_hub_instructions", as: "/create_hub"

  devise_for :users
  
  root to: 'static_pages#home'
end
