from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


app_name='mp'
urlpatterns = [
    path('',views.Index,name ='index'),
    path('getPage',views.getPage),
    pth('search',views.search),
    path('getUrl',views.getUrl,name='getUrl')
   # path('search',views.search,name='search'),
   # path('like',views.like,name='like'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

