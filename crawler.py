import sys
import json
import requests
from bs4 import BeautifulSoup

def crawl(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        title = soup.title.string if soup.title else 'No title'
        content = soup.get_text()[:1000]  # 最初の1000文字を取得
        
        data = {
            'url': url,
            'title': title,
            'content': content
        }
        
        print(json.dumps(data))
    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        crawl(sys.argv[1])
    else:
        print(json.dumps({'error': 'No URL provided'}), file=sys.stderr)