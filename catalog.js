const MUSIC_CATALOG = {
  genres: [
    {
      family: "Latin",
      items: [
        {
          name: "Salsa",
          type: "genre",
          tags: ["clave-based", "dance", "brass", "percussion"],
          compatible: ["Jazz", "Mambo", "Funk", "Cabaret"],
          bridge: ["Chanson", "Rock", "Cinematic"],
          conflict: ["Ambient", "Extreme Metal"],
          instruments: ["congas", "bongos", "timbales", "piano", "brass section"],
          rhythms: ["clave 3-2", "medium-fast dance groove"]
        },
        {
          name: "Mambo",
          type: "genre",
          tags: ["Latin", "brass", "energetic"],
          compatible: ["Salsa", "Jazz", "Big Band"],
          bridge: ["Cabaret", "Rock"],
          conflict: ["Drone Ambient"],
          instruments: ["brass section", "piano", "congas", "timbales"],
          rhythms: ["syncopated Latin groove", "clave"]
        },
        {
          name: "Bolero",
          type: "genre",
          tags: ["romantic", "slow", "Latin"],
          compatible: ["Chanson", "Jazz", "Cabaret"],
          bridge: ["Cinematic", "Folk"],
          conflict: ["Drum and Bass"],
          instruments: ["nylon guitar", "strings", "soft percussion"],
          rhythms: ["slow bolero pulse"]
        },
        {
          name: "Bossa Nova",
          type: "genre",
          tags: ["soft", "jazzy", "acoustic"],
          compatible: ["Jazz", "Samba", "Chanson"],
          bridge: ["Electronic", "Cabaret"],
          conflict: ["Extreme Metal"],
          instruments: ["nylon guitar", "soft percussion", "upright bass"],
          rhythms: ["bossa nova groove"]
        },
        {
          name: "Samba",
          type: "genre",
          tags: ["Brazilian", "dance", "percussion"],
          compatible: ["Bossa Nova", "Jazz", "Funk"],
          bridge: ["Cabaret", "Cinematic"],
          conflict: ["Drone Ambient"],
          instruments: ["surdo", "pandeiro", "cavaquinho", "brass section"],
          rhythms: ["samba groove"]
        }
      ]
    },
    {
      family: "Cabaret",
      items: [
        {
          name: "French Cabaret",
          type: "genre",
          tags: ["theatrical", "romantic", "acoustic"],
          compatible: ["Chanson", "Jazz", "Tango"],
          bridge: ["Salsa", "Cinematic", "Rock"],
          conflict: ["Extreme Metal"],
          instruments: ["accordion", "upright bass", "muted trumpet", "piano"],
          rhythms: ["theatrical swing", "slow tango pulse"]
        },
        {
          name: "Weimar Cabaret",
          type: "genre",
          tags: ["dark", "theatrical", "jazz"],
          compatible: ["Jazz", "Chanson", "Dark Cabaret"],
          bridge: ["Electronic", "Rock", "Cinematic"],
          conflict: ["Tropical House"],
          instruments: ["piano", "clarinet", "muted brass", "upright bass"],
          rhythms: ["swing groove", "march-like pulse"]
        },
        {
          name: "Dark Cabaret",
          type: "genre",
          tags: ["dark", "dramatic", "theatrical"],
          compatible: ["Gothic", "Jazz", "Chanson"],
          bridge: ["Electronic", "Rock", "Cinematic"],
          conflict: ["Bright Pop"],
          instruments: ["accordion", "piano", "strings", "low brass"],
          rhythms: ["dark waltz", "slow theatrical groove"]
        },
        {
          name: "Circus Cabaret",
          type: "genre",
          tags: ["playful", "eccentric", "theatrical"],
          compatible: ["Jazz", "Polka", "Folk"],
          bridge: ["Electronic", "Rock", "Cinematic"],
          conflict: ["Minimal Ambient"],
          instruments: ["accordion", "tuba", "snare drum", "calliope"],
          rhythms: ["circus march", "waltz"]
        }
      ]
    },
    {
      family: "Chanson",
      items: [
        {
          name: "French Chanson",
          type: "genre",
          tags: ["lyrical", "storytelling", "romantic"],
          compatible: ["Cabaret", "Jazz", "Folk"],
          bridge: ["Salsa", "Rock", "Cinematic"],
          conflict: ["Extreme Metal"],
          instruments: ["piano", "accordion", "acoustic guitar", "upright bass"],
          rhythms: ["moderate ballad", "theatrical groove"]
        },
        {
          name: "Russian Chanson",
          type: "genre",
          tags: ["storytelling", "urban", "melancholic"],
          compatible: ["Folk", "Rock", "Cabaret"],
          bridge: ["Jazz", "Electronic", "Cinematic"],
          conflict: [],
          instruments: ["acoustic guitar", "accordion", "piano", "strings"],
          rhythms: ["steady ballad", "straight groove"]
        }
      ]
    },
    {
      family: "Jazz",
      items: [
        {
          name: "Swing",
          type: "genre",
          tags: ["groove", "big band", "dance"],
          compatible: ["Cabaret", "Blues", "Salsa", "Funk"],
          bridge: ["Rock", "Cinematic"],
          conflict: ["Drone Ambient"],
          instruments: ["brass section", "piano", "upright bass", "drums"],
          rhythms: ["swing groove"]
        },
        {
          name: "Bebop",
          type: "genre",
          tags: ["fast", "virtuosic", "complex"],
          compatible: ["Jazz Fusion", "Blues"],
          bridge: ["Electronic", "Hip-hop"],
          conflict: ["Slow Ambient"],
          instruments: ["saxophone", "trumpet", "piano", "upright bass"],
          rhythms: ["fast swing"]
        },
        {
          name: "Cool Jazz",
          type: "genre",
          tags: ["restrained", "smooth", "intimate"],
          compatible: ["Bossa Nova", "Chanson", "Ambient"],
          bridge: ["Electronic", "Cinematic"],
          conflict: ["Extreme Metal"],
          instruments: ["muted trumpet", "piano", "upright bass", "brush drums"],
          rhythms: ["laid-back swing", "slow groove"]
        },
        {
          name: "Dark Jazz",
          type: "genre",
          tags: ["dark", "cinematic", "mysterious"],
          compatible: ["Cabaret", "Blues", "Cinematic"],
          bridge: ["Electronic", "Rock"],
          conflict: ["Bright Pop"],
          instruments: ["baritone saxophone", "piano", "upright bass", "strings"],
          rhythms: ["slow swing", "free pulse"]
        }
      ]
    },
    {
      family: "Rock",
      items: [
        {
          name: "Blues Rock",
          type: "genre",
          tags: ["guitar", "organic", "energetic"],
          compatible: ["Blues", "Folk", "Chanson"],
          bridge: ["Cabaret", "Jazz", "Cinematic"],
          conflict: ["Minimal Ambient"],
          instruments: ["electric guitar", "organ", "bass guitar", "live drums"],
          rhythms: ["straight rock groove", "shuffle"]
        },
        {
          name: "Alternative Rock",
          type: "genre",
          tags: ["modern", "dynamic", "guitar"],
          compatible: ["Electronic", "Folk", "Cinematic"],
          bridge: ["Cabaret", "Jazz"],
          conflict: [],
          instruments: ["electric guitars", "bass guitar", "live drums", "synth textures"],
          rhythms: ["straight beat", "half-time"]
        },
        {
          name: "Progressive Rock",
          type: "genre",
          tags: ["complex", "evolving", "instrumental"],
          compatible: ["Classical", "Jazz Fusion", "Electronic"],
          bridge: ["Folk", "Cinematic"],
          conflict: [],
          instruments: ["electric guitar", "analog synth", "drums", "strings"],
          rhythms: ["odd meter", "changing time signatures"]
        }
      ]
    },
    {
      family: "Folk",
      items: [
        {
          name: "European Folk",
          type: "genre",
          tags: ["organic", "traditional", "acoustic"],
          compatible: ["Rock", "Chanson", "Classical"],
          bridge: ["Electronic", "Cinematic", "Cabaret"],
          conflict: [],
          instruments: ["acoustic guitar", "fiddle", "accordion", "frame drum"],
          rhythms: ["folk dance groove", "waltz"]
        },
        {
          name: "Celtic Folk",
          type: "genre",
          tags: ["dance", "organic", "uplifting"],
          compatible: ["Rock", "Cinematic", "Classical"],
          bridge: ["Electronic", "Cabaret"],
          conflict: ["Drone Ambient"],
          instruments: ["fiddle", "tin whistle", "bodhran", "acoustic guitar"],
          rhythms: ["reel", "jig", "folk dance groove"]
        },
        {
          name: "Eastern European Folk",
          type: "genre",
          tags: ["ornamental", "dramatic", "traditional"],
          compatible: ["Rock", "Classical", "Cinematic"],
          bridge: ["Electronic", "Jazz"],
          conflict: [],
          instruments: ["accordion", "clarinet", "fiddle", "brass"],
          rhythms: ["asymmetric folk groove", "dance pulse"]
        }
      ]
    },
    {
      family: "Classical",
      items: [
        {
          name: "Chamber Music",
          type: "genre",
          tags: ["acoustic", "intimate", "detailed"],
          compatible: ["Cinematic", "Jazz", "Cabaret"],
          bridge: ["Rock", "Electronic"],
          conflict: ["Extreme Metal"],
          instruments: ["string quartet", "piano", "woodwinds"],
          rhythms: ["flexible tempo", "measured pulse"]
        },
        {
          name: "Orchestral",
          type: "genre",
          tags: ["large-scale", "dramatic", "cinematic"],
          compatible: ["Cinematic", "Rock", "Electronic"],
          bridge: ["Jazz", "Folk", "Cabaret"],
          conflict: [],
          instruments: ["full orchestra", "choir", "percussion", "brass"],
          rhythms: ["dramatic pulse", " rubato"]
        }
      ]
    },
    {
      family: "Electronic",
      items: [
        {
          name: "Synthwave",
          type: "genre",
          tags: ["retro", "synth", "driving"],
          compatible: ["Rock", "Cinematic", "Pop"],
          bridge: ["Jazz", "Cabaret", "Folk"],
          conflict: ["Pure Acoustic"],
          instruments: ["analog synthesizers", "electronic drums", "synth bass"],
          rhythms: ["four-on-the-floor", "driving pulse"]
        },
        {
          name: "Ambient",
          type: "genre",
          tags: ["spacious", "slow", "textural"],
          compatible: ["Cinematic", "Cool Jazz", "Classical"],
          bridge: ["Rock", "Folk"],
          conflict: ["Salsa", "Drum and Bass"],
          instruments: ["pads", "granular textures", "soft piano", "field recordings"],
          rhythms: ["free pulse", "slow evolving texture"]
        },
        {
          name: "Trip-hop",
          type: "genre",
          tags: ["moody", "groove", "downtempo"],
          compatible: ["Jazz", "Blues", "Chanson"],
          bridge: ["Cabaret", "Rock", "Cinematic"],
          conflict: [],
          instruments: ["sampled drums", "sub bass", "electric piano", "ambient textures"],
          rhythms: ["slow breakbeat", "half-time"]
        }
      ]
    },
    {
      family: "Reggae",
      items: [
        {
          name: "Roots Reggae",
          type: "genre",
          tags: ["organic", "laid-back", "bass-driven"],
          compatible: ["Dub", "Funk", "Folk"],
          bridge: ["Jazz", "Rock", "Chanson"],
          conflict: ["Extreme Metal"],
          instruments: ["electric bass", "organ", "guitar skank", "drums"],
          rhythms: ["one-drop groove"]
        }
      ]
    },
    {
      family: "Hip-hop",
      items: [
        {
          name: "Boom Bap",
          type: "genre",
          tags: ["sampled", "groove", "rhythmic"],
          compatible: ["Jazz", "Blues", "Funk"],
          bridge: ["Rock", "Classical", "Cabaret"],
          conflict: [],
          instruments: ["sampled drums", "electric piano", "upright bass", "turntable textures"],
          rhythms: ["boom bap", "head-nod groove"]
        },
        {
          name: "Conscious Hip-hop",
          type: "genre",
          tags: ["storytelling", "lyrical", "social"],
          compatible: ["Jazz", "Soul", "Funk"],
          bridge: ["Chanson", "Rock", "Cinematic"],
          conflict: [],
          instruments: ["sampled drums", "piano", "bass", "strings"],
          rhythms: ["modern hip-hop groove"]
        }
      ]
    },
    {
      family: "Cinematic",
      items: [
        {
          name: "Film Score",
          type: "genre",
          tags: ["dramatic", "visual", "dynamic"],
          compatible: ["Orchestral", "Ambient", "Rock"],
          bridge: ["Salsa", "Jazz", "Cabaret"],
          conflict: [],
          instruments: ["strings", "brass", "piano", "cinematic percussion"],
          rhythms: ["dramatic pulse", "flexible tempo"]
        },
        {
          name: "Trailer Music",
          type: "genre",
          tags: ["epic", "impactful", "rising"],
          compatible: ["Rock", "Electronic", "Orchestral"],
          bridge: ["Folk", "Jazz", "Cabaret"],
          conflict: ["Minimal Ambient"],
          instruments: ["hybrid orchestra", "deep percussion", "brass", "synth bass"],
          rhythms: ["driving pulse", "half-time"]
        }
      ]
    }
  ],

  rhythms: [
    "clave 3-2",
    "swing groove",
    "tango pulse",
    "waltz",
    "shuffle",
    "straight beat",
    "half-time",
    "four-on-the-floor",
    "slow breakbeat",
    "free pulse",
    "odd meter",
    "folk dance groove"
  ],

  instruments: [
    "piano",
    "upright piano",
    "accordion",
    "bandoneon",
    "nylon-string guitar",
    "electric guitar",
    "upright bass",
    "bass guitar",
    "brass section",
    "muted trumpet",
    "saxophone",
    "string section",
    "string quartet",
    "chamber ensemble",
    "full orchestra",
    "live rhythm section",
    "electronic drums",
    "analog synthesizers",
    "choir"
  ],

  vocals: [
    "male vocal",
    "female vocal",
    "soft delivery",
    "slightly raspy",
    "low register",
    "contralto color",
    "theatrical delivery",
    "conversational delivery",
    "intimate delivery",
    "powerful delivery",
    "restrained delivery",
    "backing choir"
  ]
};                      
