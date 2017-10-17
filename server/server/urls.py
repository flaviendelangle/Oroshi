from django.conf.urls import include, url
from django.contrib import admin

from rest_framework_extensions.routers import ExtendedSimpleRouter

from api.Collections.views import CollectionsViewSet
from api.Directors.views import DirectorsViewSet
from api.Movies.views import MoviesViewSet, MoviesCollectionsViewSet

router = ExtendedSimpleRouter()

router.register(r'^collections', CollectionsViewSet, base_name="collections")
router.register(r'^directors', DirectorsViewSet, base_name="directors")
movies_routes = router.register(r'^movies', MoviesViewSet, base_name="movies")

movies_routes.register(r'collections', MoviesCollectionsViewSet, base_name="collections_movies", parents_query_lookups=["movies"])

urlpatterns = [
    url(r'^api/', include(router.urls)),
    #url(r'^admin/', admin.site.urls),
]
