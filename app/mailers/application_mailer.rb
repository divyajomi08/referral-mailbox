class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout "mailer"
  default template_path: -> { "mailers/#{self.class.name.underscore}" }
end
