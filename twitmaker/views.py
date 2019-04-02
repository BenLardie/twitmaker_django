from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from twitmaker.models import Tweet
from twitmaker.forms import TweetForm

def index(request):
    tweets = Tweet.objects.all()
    context = {'tweets': tweets, 'form': TweetForm()}
    return render(request, 'index.html', context)


def create_tweet(request):
    form = TweetForm(request.POST)
    tweet = form.instance
    if form.is_valid():
        form.save()
        newTweet = Tweet.objects.get(pk=tweet.pk)
        resp = {'message': newTweet.message, 'created_at': newTweet.created_at}
        return JsonResponse(resp)
    else:
        context = {'tweets': Tweet.objects.all(), 'form': form}
        return render(request, 'index.html', context)
