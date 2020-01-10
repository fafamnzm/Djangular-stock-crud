from rest_framework import serializers
from .models import StockData

class StockDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StockData
        #fields = ('ticker', 'volume') #if just want to send some
        fields = '__all__'
        