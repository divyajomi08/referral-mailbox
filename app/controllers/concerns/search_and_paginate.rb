module SearchAndPaginate
  extend ActiveSupport::Concern

  def search_and_paginate(model, searchable_column = 'referred_email')
    result = model
    result = search_model(model, searchable_column) if searchable_column != ''
    paginate(result)
  end

  private

  def search_model(model, searchable_column)
    model.where(
      "#{searchable_column} LIKE ?",
      "%#{search.downcase}%"
    ).order('created_at DESC')
  end

  def paginate(search_result)
    {
      paginated_data: search_result.page(page).per(per_page),
      count: search_result.size
    }
  end

  def page
    params[:page] || 1
  end

  def per_page
    params[:per_page] || 10
  end

  def search
    params[:search] || ''
  end
end
