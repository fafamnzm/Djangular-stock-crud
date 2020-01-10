from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import StockData
from .serializers import StockDataSerializer

# Create your views here.

#stocks/{ticker}
class StockList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    #send back all stocks
    def get(self, req):
        stocks = StockData.objects.all()
        serializer = StockDataSerializer(stocks, many=True)
        return Response(serializer.data)
    
    
    #create a new one
    def post(self, req, format=None):
        serializer = StockDataSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StockDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return StockData.objects.get(pk=pk)
        except StockData.DoesNotExist:
            raise Http404
    
    def get(self, req, pk, format=None):
        stock = self.get_object(pk)
        serializer = StockDataSerializer(stock)
        return Response(serializer.data)
    
    def put(self, req, pk, format=None):
        stock = self.get_object(pk)
        serializer = StockDataSerializer(stock, data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stattus=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, req, pk, format=None):
        stock = self.get_object(pk)
        stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    