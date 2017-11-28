from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Users.models import Users
from api.Users.serializers import UsersSerializer


class UsersViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        return UsersSerializer

    def get_queryset(self):
        return Users.objects.all()

    def create(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid('create'):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)