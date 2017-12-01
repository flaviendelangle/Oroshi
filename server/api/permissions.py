from rest_framework import permissions


class IsAuthenticatedOrCreate(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return super(IsAuthenticatedOrCreate, self).has_permission(request, view)


class IsOwnerOrNotUpdate(permissions.BasePermission):
    def has_object_permission(self, request, obj):
        if request.method in ['PATCH', 'PUT', 'DELETE']:
            if obj.__class__.__name__ == 'UserAccount':
                return obj == request.user
            return obj.user == request.user
        return True

