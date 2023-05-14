Rails.application.routes.draw do
  devise_for :users

  root 'home#index'
  get '/logged_in', to: 'authentication#logged_in'
  get '*path', to: 'home#index', via: :all
end
