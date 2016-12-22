Rails.application.routes.draw do
  resources :timelapse_hubs, only: [:index, :new, :create, :show]

  resources :photographs, only: [:new, :create, :edit, :update] do
    member do
      get 'set_location'
    end
  end

  devise_for :users
  
  root to: 'static_pages#home'
end
