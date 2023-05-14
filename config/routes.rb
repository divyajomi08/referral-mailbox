Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'api/v1/registrations' }
  namespace :api, defaults: { format: :json } do
    namespace :v1, defaults: { format: :json } do
      resources :referrals, only: %i[index create]
    end
  end

  get '/logged_in', to: 'authentication#logged_in'

  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
