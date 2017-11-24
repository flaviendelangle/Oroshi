from django.conf.urls import include, url
from django.contrib import admin

from rest_framework_extensions.routers import ExtendedSimpleRouter

from api.Collections.views import CollectionsViewSet
from api.MovieCollections.views import MovieCollectionsViewSet
from api.TVShowCollections.views import TVShowCollectionsViewSet

from api.Users.views import UsersViewSet

from api.Movies.views import MoviesViewSet, CollectionMoviesViewSet
from api.TVShows.views import TVShowsViewSet, CollectionTVShowsViewet

from api.Directors.views import DirectorsViewSet
from api.Networks.views import NetworksViewSet
from api.Genres.views import GenresViewSet


router = ExtendedSimpleRouter()

collections = router.register(r'^collections', CollectionsViewSet, base_name="collections")
movie_collections_routes = router.register(r'^movie_collections', MovieCollectionsViewSet,
                                           base_name="movie_collections")
tv_shows_collections_route = router.register(r'^tv_show_collections', TVShowCollectionsViewSet,
                                             base_name="tv_show_collections")
router.register(r'^users', UsersViewSet, base_name="users")
router.register(r'^directors', DirectorsViewSet, base_name="directors")
router.register(r'^networks', NetworksViewSet, base_name="networks")
router.register(r'^genres', GenresViewSet, base_name="genres")
router.register(r'^movies', MoviesViewSet, base_name="movies")
router.register(r'^tv_shows', TVShowsViewSet, base_name="tv_shows")

movie_collections_routes.register(r'movies', CollectionMoviesViewSet,
                        base_name="collection_movies",
                        parents_query_lookups=["collection_movies"])

tv_shows_collections_route.register(r'tv_shows', CollectionTVShowsViewet,
                                  base_name="collection_tv_shows",
                                  parents_query_lookups=["collection_tv_shows"])

urlpatterns = [
    url(r'^api/', include(router.urls)),
    #url(r'^admin/', admin.site.urls),
]
