import random
import json
import uuid

def dumper(obj):
    try:
        return obj.toJSON()
    except:
        return obj.__dict__

class Post:
    def __init__(self, _id, content, comments):
        self._id = _id
        self.content = content
        self.comments = comments

class Comment:
    def __init__(self, _id, content, reactions):
        self._id = _id
        self.content = content
        self.reactions = reactions

class Reaction:
    def __init__(self, _id, emoji):
        self._id = _id
        self.emoji = emoji

postFile = open("posts-really-large.json", "w")

posts = []
for post in range(2500):
    print(post)
    comments = []
    for comment in range(150, 180):
        reactions = []
        for r in range(random.randint(50, 80)):
            reactions.append(Reaction(str(uuid.uuid4()), random.choice(["corazon", "sombrilla", "computador", "camello"])))
        comments.append(Comment(str(uuid.uuid4()), "COMMENT #" + str(comment) + " ON POST #{}".format(str(post)), reactions))
    posts.append(Post(str(uuid.uuid4()), "POST #" + str(post), comments))

json.dump(posts, postFile, default=dumper, indent=2)
postFile.close()
