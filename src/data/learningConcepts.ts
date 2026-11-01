export type LearningConcept = {
  id: string;
  conceptNumber: number;
  topic: string;
  summary: string;
  description: string;
  recommendations: string[];
};

export const learningConcepts: Record<string, LearningConcept> = {
  "location-exposure": {
    id: "location-exposure",
    conceptNumber: 1,
    topic: "Location Exposure",
    summary:
      "Applications, maps, location permissions, and location metadata can reveal a person's whereabouts. Unnecessary location access or exposed location information can make it easier to track someone.",
    description:
      "Digital applications frequently request continuous geolocation permissions or record geographic metadata within files, logs, and viewport states. When location tracking remains active unnecessarily, third-party observers or unauthorized networks can correlate time and physical coordinates to track movement, discover private addresses, and reconstruct personal routines.",
    recommendations: [
      "Disable unnecessary continuous location tracking in mapping software.",
      "Review and revoke background location permissions for unneeded services.",
      "Remove geographic metadata (EXIF/GPS) before sharing files or diagnostics.",
    ],
  },
  "rate-limiting": {
    id: "rate-limiting",
    conceptNumber: 1,
    topic: "Rate Limiting",
    summary:
      "Rate limiting controls how many times someone can perform an action in a certain amount of time. It helps stop automated abuse and gives services time to handle requests safely.",
    description:
      "Imagine someone repeatedly trying to guess a password or pressing the same button hundreds of times in a few seconds. Without limits, they can overwhelm a service or make repeated guesses. Rate limiting sets a reasonable limit—for example, allowing only a certain number of login attempts within one minute. When the limit is reached, the service can temporarily delay or reject further attempts.",
    recommendations: [
      "Limit repeated login attempts and verification-code requests.",
      "Use a short cooldown after too many failed attempts.",
      "Show a clear message when a user must wait before trying again.",
      "Apply limits on the server as well as in the interface; a disabled button alone is not a security control.",
    ],
  },
  "hashing": {
    id: "hashing",
    conceptNumber: 2,
    topic: "Hashing",
    summary:
      "Hashing turns data into a fixed-length fingerprint that is designed to be difficult to reverse.",
    description:
      "Imagine a special machine that turns an object into a label. An apple might become A7F92K and a banana B83X21. You can create the label from the object, but you cannot simply turn the label back into the original object. In security, systems store password hashes instead of storing the original passwords. If a database is stolen, the attacker does not immediately see the actual passwords. Real hash outputs are produced by algorithms and are not guaranteed to be unique for every possible input; password storage should use a dedicated password-hashing algorithm with a unique salt.",
    recommendations: [
      "Never store passwords as plain text.",
      "Use a dedicated password-hashing algorithm such as Argon2id, scrypt, or bcrypt.",
      "Use a unique salt for each password hash.",
      "Remember that hashing is not encryption: a hash is not meant to be decrypted.",
    ],
  },
  "bloom-filter": {
    id: "bloom-filter",
    conceptNumber: 3,
    topic: "Bloom Filter",
    summary: "A Bloom Filter is a fast, memory-efficient way to test whether an item might be in a set.",
    description: "A Bloom Filter can say an item is definitely not present, or that it might be present. A positive result can be a false positive, but a negative result is reliable when the filter is used correctly.",
    recommendations: [
      "Use Bloom Filters as a fast pre-check, not as the only authorization decision.",
      "Treat a possible match as a reason to check the source of truth.",
      "Choose the filter size and hash count based on the acceptable false-positive rate."
    ]
  },
  "location-exposure-through-digital-traces": {
    id: "location-exposure-through-digital-traces",
    conceptNumber: 3,
    topic: "Location Exposure Through Digital Traces",
    summary:
      "Location can be inferred from profile fields, request metadata, activity records, and other digital traces—not only from live GPS access.",
    description:
      "In this fictional browser exercise, a simulated request includes a location hint. Real applications can expose more information than users expect when they send profile metadata or retain unnecessary location-related fields. The panel is simulated and does not contact a network or reveal a real location.",
    recommendations: [
      "Send only the data a feature needs.",
      "Review network requests and remove unnecessary location fields.",
      "Avoid publishing precise location details in public profiles or activity records.",
    ],
  },
  "access-token": {
    id: "access-token",
    conceptNumber: 4,
    topic: "Access Token",
    summary:
      "An access token is a temporary digital ticket proving you're allowed to access protected resources without having to re-authenticate repeatedly.",
    description:
      "Imagine entering a concert. At the entrance, the guard checks your ticket once and gives you wristband or stamp. You don't have to prove your identity again every time you buy something. An access token works like that ticket: Login → Get access token → Access protected resources. When the ticket expires, you must authenticate again.",
    recommendations: [
      "Store access tokens securely and never expose them in client logs or URLs.",
      "Use short-lived tokens with refresh tokens where appropriate.",
      "Revoke compromised tokens immediately upon detecting anomalous session activity.",
    ],
  },
  "caching": {
    id: "caching",
    conceptNumber: 5,
    topic: "Caching",
    summary:
      "Caching is keeping commonly needed data nearby so it can be delivered faster without querying slower backend storage every time.",
    description:
      "Imagine your favorite restaurant keeps some burgers already prepared instead of cooking from scratch every time you order. Caching keeps frequently used information close at hand so systems don't have to fetch it from slower databases or remote networks repeatedly.",
    recommendations: [
      "Cache frequently accessed, slow-changing data nearby.",
      "Ensure cached data invalidates or expires when the underlying source changes.",
      "Avoid caching sensitive personal or authentication records in insecure client storage.",
    ],
  },
  "race-condition": {
    id: "race-condition",
    conceptNumber: 6,
    topic: "Race Condition",
    summary:
      "Race Condition = When timing between simultaneous actions causes the system to behave incorrectly.",
    description:
      "Imagine two people trying to grab the last pizza at exactly the same time. If the system doesn't properly control who gets it first, both might think they got it! In computers, this happens when two actions access/change the same information at nearly the same time, causing an unexpected result.",
    recommendations: [
      "Use synchronization primitives, locks, or atomic operations when concurrent processes modify shared state.",
      "Enforce transactional integrity and database isolation levels.",
      "Validate state immediately before mutations to prevent time-of-check to time-of-use (TOCTOU) flaws.",
    ],
  },
  "ciphertext": {
    id: "ciphertext",
    conceptNumber: 7,
    topic: "Ciphertext",
    summary:
      "Ciphertext = Encrypted, unreadable data created from the original message.",
    description:
      "Imagine writing a secret message: “MEET AT 5”. Then you put it through a secret-code machine: X7#K92@P. Now someone looking at it can't understand it. That scrambled message is ciphertext. Original message → Encryption → Ciphertext. And with the right key: Key → Ciphertext → Original message.",
    recommendations: [
      "Always encrypt sensitive data in transit and at rest.",
      "Protect cryptographic keys; encrypted ciphertext is only as secure as key management.",
      "Do not attempt to write custom encryption algorithms—use vetted cryptographic standards.",
    ],
  },
  "latency": {
    id: "latency",
    conceptNumber: 8,
    topic: "Latency",
    summary:
      "Latency = How long you have to wait for a response.",
    description:
      "Imagine ordering food. You click “Order Pizza”. Then 1 sec, 2 sec, 3 sec, Pizza Arrives! Those 3 seconds of waiting are like latency. In computers: You → Server → You. The time taken for the request to travel and get a response is latency.",
    recommendations: [
      "Deploy content delivery networks (CDNs) and caches closer to edge clients.",
      "Minimize round trips by batching or streaming network payloads.",
      "Profile high-latency endpoints and optimize query execution.",
    ],
  },
  "cryptography": {
    id: "cryptography",
    conceptNumber: 9,
    topic: "Cryptography",
    summary:
      "Cryptography = Using mathematics to protect information and communication.",
    description:
      "Imagine you want to send a secret letter. ✉️\n\nInstead of simply sending:\n\n📝 \"Meet me at 5.\"\n\nYou put it inside a locked box 🔒 and only the intended person has the key 🔑.\n\nThat's the basic idea of cryptography. It uses mathematical techniques to protect information through things like:\n\n• 🔒 Encryption\n• 🔑 Keys\n• ✍️ Digital signatures\n• 🔐 Secure communication",
    recommendations: [
      "Always encrypt sensitive data in transit (TLS) and at rest (AES-GCM).",
      "Use modern, standard encryption algorithms instead of custom schemes.",
      "Safeguard cryptographic keys in secure enclaves or hardware security modules.",
    ],
  },
  "snowflake": {
    id: "snowflake",
    conceptNumber: 10,
    topic: "Snowflake",
    summary:
      "Snowflake = A cloud-based platform for storing, processing, and analyzing massive amounts of data.",
    description:
      "Imagine a huge warehouse 🏢 filled with millions of boxes 📦.\n\nInstead of keeping everything in one messy pile, Snowflake organizes the data so you can store huge amounts of information and quickly search/analyze it.\n\nFor example, a company has:\n• 👤 10M customers\n• 🛒 500M orders\n• 💰 Years of payment data\n\nSnowflake lets them store and analyze all of this without managing physical servers.\n\nData 📦 → ☁️ Snowflake → 🔍 Analyze → 📊 Insights\n\nAnd because it's cloud-based, computing power scales dynamically:\n• 📈 More work → ⚡ More computing\n• 📉 Less work → 💰 Less computing",
    recommendations: [
      "Separate compute from storage to scale query processing independently.",
      "Apply strict role-based access control (RBAC) and data masking to sensitive warehouses.",
      "Monitor query execution times and auto-suspend idle warehouses to optimize cost.",
    ],
  },
  "cdn": {
    id: "cdn",
    conceptNumber: 11,
    topic: "CDN",
    summary:
      "CDN = A network of servers that delivers website content from a location closer to the user, making things faster.",
    description:
      "Imagine a pizza company with one kitchen in Delhi. 🍕\n\nSomeone in Mumbai orders:\n📱 Mumbai → 🚚 → 🏢 Delhi → 🚚 → 🍕 Mumbai\nThat's slow.\n\nSo the company opens smaller kitchens in different cities:\n• 🏢 Delhi\n• 🏢 Mumbai\n• 🏢 Bangalore\n• 🏢 Kolkata\n\nNow you get the pizza from the nearest kitchen. ⚡\n\nA CDN does something similar for websites. Instead of everyone fetching from one distant server, a CDN caches copies of images, videos, web files, and scripts at edge servers worldwide.\n\n🇮🇳 User → 🇮🇳 Nearby CDN → ⚡ Website",
    recommendations: [
      "Offload static assets (multimedia, CSS, JS) to geographically distributed edge points.",
      "Configure aggressive caching rules with proper cache-invalidation headers.",
      "Terminate SSL/TLS closer to end users to reduce initial handshake latency.",
    ],
  },
};

export function getLearningConcept(id: string): LearningConcept | undefined {
  return learningConcepts[id];
}
