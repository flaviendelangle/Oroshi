from django.conf.urls import include, url
from django.contrib import admin

from rest_framework import routers

from api.Directors.views import DirectorsViewSet
from api.Movies.views import MoviesViewSet

router = routers.DefaultRouter()

router.register(r'directors', DirectorsViewSet, base_name="directors")
router.register(r'movies', MoviesViewSet, base_name="movies")

urlpatterns = [
    url(r'^api/', include(router.urls)),
    #url(r'^admin/', admin.site.urls),
]
