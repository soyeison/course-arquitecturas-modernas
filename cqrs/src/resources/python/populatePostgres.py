import random

commentId = 1
reactionId = 1
postFile = open('posts.sql', 'w')
commentFile = open('comments.sql', 'w')
reactionFile = open('reactions.sql', 'w')
postFile.write('INSERT INTO public."Post" (id, content) VALUES\n')
commentFile.write('INSERT INTO public."Comment" (id, content, post_id) VALUES\n')
reactionFile.write('INSERT INTO public."Reaction" (id, emoji, comment_id) VALUES\n')

for post in range(3, 12):
    postStr = "({}, {}),\n".format(str(post), "'POST #{}'".format(str(post)))
    postFile.write(postStr)
    for comment in range(random.randint(500, 5000)):
        commentStr = "({}, {}, {}),\n".format(commentId, "'COMMENT #{} ON POST #{}'".format(str(comment), str(post)), post)
        commentFile.write(commentStr)
        for reaction in range(random.randint(30, 60)):
            reactionStr = "({}, {}, {}),\n".format(reactionId, random.choice(["'corazon'", "'sombrilla'", "'computador'", "'camello'"]), commentId)
            reactionId += 1
            reactionFile.write(reactionStr)
        commentId += 1
postFile.write(';')
commentFile.write(';')
reactionFile.write(';')

postFile.close()
reactionFile.close()
commentFile.close()
