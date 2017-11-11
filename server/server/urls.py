from django.conf.urls import include, url
from django.contrib import admin

from rest_framework_extensions.routers import ExtendedSimpleRouter

from api.Collections.views import CollectionsViewSet
from api.MovieCollections.views import MovieCollectionsViewSet
from api.TVShowCollections.views import TVShowCollectionsViewSet

from api.Movies.views import MoviesViewSet, CollectionMoviesViewSet

from api.Directors.views import DirectorsViewSet
from api.Genres.views import GenresViewSet


router = ExtendedSimpleRouter()

collections = router.register(r'^collections', CollectionsViewSet, base_name="collections")
movie_collections_routes = router.register(r'^movie_collections', MovieCollectionsViewSet,
                                           base_name="movie_collections")
tv_shows_collections_route = router.register(r'^tv_show_collections', TVShowCollectionsViewSet,
                                             base_name="tv_show_collections")
router.register(r'^directors', DirectorsViewSet, base_name="directors")
router.register(r'^genres', GenresViewSet, base_name="genres")
router.register(r'^movies', MoviesViewSet, base_name="movies")

movie_collections_routes.register(r'movies', CollectionMoviesViewSet,
                        base_name="collection_movies",
                        parents_query_lookups=["collection_movies"])

urlpatterns = [
    url(r'^api/', include(router.urls)),
    #url(r'^admin/', admin.site.urls),
]
