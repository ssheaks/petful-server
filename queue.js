'use strict';

class _Node {
  constructor(value, next, prev) {
    this.value=value,
    this.next=null,
    this.prev=null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(value) {
    //create a node with the data that you want to add to the queue
    const node = new _Node(value);

    //if the queue is empty, 
    //make the node the first node on the queue
    if (this.head === null) {
      this.head = node;
    }
    //if there is something on the queue already
    //then take the node that is currently at the end of the queue
    //and link it to the new node
    if (this.tail) {
      node.next = this.tail;
      this.tail.prev = node;
    }
    //make the new node the last item on the queue
    this.tail = node;
  }

  dequeue() {
  //if the queue is empty, there is nothing to return
    if (this.head === null) {
      return;
    }
    //make the first item on the queue to be the 
    //the item that is next on the line 
    // the item after the current first item

    const node = this.head;
    this.head = node.prev;

    //if this is the last item in the queue
    if (node === this.tail) {
      this.tail = null;
    }

    return node.value;
  }

  peek() {
    if (this.head === null) {
      return;
    }
    let currQueue = this.head;
    return currQueue.value;
  }

}

function peek(queue) {
  let currQueue = queue.head;
  return currQueue.value;
}

//display queue function
function display(queue) {
  let currQueue = queue.head;
  
  if (currQueue === null) {
    throw new Error ('Nothing to display');
  }

  let res = currQueue.value;

  while (currQueue !== queue.tail) {
    currQueue = currQueue.prev;
    res = currQueue.value + ', ' + res;
  }
  return res;
}

let catQueue = new Queue();
let dogQueue = new Queue();

catQueue.enqueue({
  type: 'cat',
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
});
catQueue.enqueue({
  type: 'cat',
  imageURL:'https://pet-uploads.adoptapet.com/1/4/b/59371175.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Leopold',
  sex: 'Male',
  age: 8,
  breed: 'Maine Coon',
  story: 'Owner could no longer care for him'
});
catQueue.enqueue({
  type: 'cat',
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Bob',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
});

dogQueue.enqueue({
  type: 'dog',
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
});
dogQueue.enqueue({
  type: 'dog',
  imageURL: 'http://www.dogbreedslist.info/uploads/allimg/dog-pictures/German-Shepherd-Dog-2.jpg',
  imageDescription: 'An energetic pup looking for love and cuddles.',
  name: 'Gazelle',
  sex: 'Female',
  age: 2,
  breed: 'German Shepherd',
  story: 'Needed more space and attention'
});
dogQueue.enqueue({
  type: 'dog',
  imageURL: 'http://www.dogbreedslist.info/uploads/allimg/dog-pictures/Siberian-Husky-2.jpg',
  imageDescription: 'A loving girl looking fo her forever home.',
  name: 'Maggie',
  sex: 'Female',
  age: 7,
  breed: 'Siberian husky',
  story: 'Found abandoned'
});

// console.log(catQueue);
// console.log(peek(catQueue));
// console.log(dogQueue);

module.exports = { catQueue, dogQueue, Queue };

