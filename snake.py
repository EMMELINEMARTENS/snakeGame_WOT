import time, random
from sense_hat import SenseHat

s = SenseHat()

red = (255, 0,0)
green = (0,255,0)
clear =(0,0,0)

snake = [[3,3]]
direction = [1,0]
length = 1

applePos=[random.randint(0,7), random.randint(0,7)]

pixels = [clear] * 64 

def setDirection(d): #0 = 'up', 1 ='right', 2 = 'down', 3 ='left'

  global direction
  
  if d == 0:
    direction = [0, -1]
  elif d == 1:
    direction = [1,0]
  elif d == 2:
    direction = [0,1]
  elif d == 3:
    direction = [-1,0]

while True:
  
  pixels = [clear] * 64
  
  for event in s.stick.get_events():
    # print(event.direction, event.action)
    
    if event.action == 'pressed':
      
      if event.direction == 'up':
        setDirection(0)
      elif event.direction == 'right':
        setDirection(1)
      elif event.direction == 'down':
        setDirection(2)
      elif event.direction == 'left':
        setDirection(3)
        
  snake.insert(0, [snake[0][0] + direction[0], snake[0][1] + direction[1]])
  
  if snake[0][0] < 0:
    snake[0][0] = 7
  if snake[0][1] < 0:
    snake[0][1] = 7
  if snake[0][0] > 7:
    snake[0][0] = 0
  if snake[0][1] > 7:
    snake[0][1] = 0
  
  if snake[0] == applePos:
    applePos= []
    while applePos == []:
      applePos = [random.randint(0,7), random.randint(0,7)]
      if applePos in snake:
        applePos=[]
    length += 1
  
  elif snake[0] in snake[1:]: #reset length if snake runs into itself
      length = 1
    
  else:
    while len(snake) > length:
      snake.pop()
  for pos in snake:
    pixels[pos[1] * 8 + pos[0]] = green
  
  #y * rowsize + x = color
  pixels[applePos[1] * 8 + applePos[0]] = red
  
  s.set_pixels(pixels)
  
  time.sleep(0.15)
