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
    resources :photographs, only: [:create, :index, :update]
    resources :timelapse_hubs, only: [:index, :show, :create, :update]
    resources :users, only: [:update]
    get '/users/current_user', to: 'users#current_logged_in_user'
  end
  
  #STATIC_PAGES
  get 'static_pages/new_hub_instructions', to: 'static_pages#new_hub_instructions', as: '/create_hub'
  get '/static_pages/fetch_landing_hub', to: 'static_pages#fetch_landing_hub'
  get '/static_pages/fetch_main_images', to: 'static_pages#fetch_main_images'
  get '/terms_of_service', to: 'static_pages#terms_of_service'
  get '/payment_terms_of_service', to: 'static_pages#payment_terms_of_service'
  get '/fetch_map_image', to: 'static_pages#fetch_map_image', as: '/fetch_map_image'
  get '/welcome_guest_user' => 'static_pages#demonstration'

  devise_for :users
  
  root to: 'static_pages#home'
end
