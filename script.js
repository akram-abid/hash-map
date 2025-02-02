class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value) {
        const newNode = new Node(key, value);
        
        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current) {
            if (current.key === key) {
                current.value = value;
                return;
            }
            current = current.next;
        }

        current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    find(key) {
        let current = this.head;
        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }

    remove(key) {
        if (!this.head) return false;

        if (this.head.key === key) {
            this.head = this.head.next;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.key === key) {
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    getEntries() {
        const entries = [];
        let current = this.head;
        while (current) {
            entries.push([current.key, current.value]);
            current = current.next;
        }
        return entries;
    }
}

export class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity).fill(null).map(() => new LinkedList());
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
    }

    validateIndex(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        
        return hashCode;
    }

    set(key, value) {
        if (this.size >= this.capacity * this.loadFactor) {
            this.resize();
        }

        const index = this.hash(key);
        this.validateIndex(index);
        
        const bucket = this.buckets[index];
        
        const existingValue = bucket.find(key);
        if (existingValue === null) {
            this.size++;
        }
        
        bucket.append(key, value);
    }

    get(key) {
        const index = this.hash(key);
        this.validateIndex(index);
        return this.buckets[index].find(key);
    }

    has(key) {
        const index = this.hash(key);
        this.validateIndex(index);
        return this.buckets[index].find(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        this.validateIndex(index);
        const removed = this.buckets[index].remove(key);
        if (removed) {
            this.size--;
        }
        return removed;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => new LinkedList());
        this.size = 0;
    }

    keys() {
        return this.entries().map(([key]) => key);
    }

    values() {
        return this.entries().map(([_, value]) => value);
    }

    entries() {
        const allEntries = [];
        for (let i = 0; i < this.buckets.length; i++) {
            this.validateIndex(i);
            allEntries.push(...this.buckets[i].getEntries());
        }
        return allEntries;
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => new LinkedList());
        this.size = 0;

        for (let i = 0; i < oldBuckets.length; i++) {
            this.validateIndex(i);
            const entries = oldBuckets[i].getEntries();
            for (const [key, value] of entries) {
                this.set(key, value);
            }
        }
    }
}