
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, LogIn, User, Star, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthDialog from "@/components/AuthDialog";
import AddToolDialog from "@/components/AddToolDialog";

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  rating: number;
  isPremium: boolean;
  tags: string[];
  addedBy?: string;
}

const mockTools: AITool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "Advanced conversational AI for text generation, coding help, and creative writing",
    category: "Text Generation",
    url: "https://chat.openai.com",
    rating: 4.8,
    isPremium: false,
    tags: ["chatbot", "writing", "coding"]
  },
  {
    id: "2",
    name: "DALL-E 3",
    description: "Create stunning images from text descriptions with advanced AI image generation",
    category: "Image Generation",
    url: "https://openai.com/dall-e-3",
    rating: 4.7,
    isPremium: true,
    tags: ["image", "art", "creative"]
  },
  {
    id: "3",
    name: "GitHub Copilot",
    description: "AI-powered code completion and programming assistant for developers",
    category: "Code Assistant",
    url: "https://github.com/features/copilot",
    rating: 4.6,
    isPremium: true,
    tags: ["coding", "development", "autocomplete"]
  },
  {
    id: "4",
    name: "Midjourney",
    description: "Create beautiful, artistic images through Discord-based AI art generation",
    category: "Image Generation",
    url: "https://midjourney.com",
    rating: 4.9,
    isPremium: true,
    tags: ["art", "discord", "creative"]
  },
  {
    id: "5",
    name: "Grammarly",
    description: "AI-powered writing assistant for grammar, spelling, and style improvements",
    category: "Writing Assistant",
    url: "https://grammarly.com",
    rating: 4.5,
    isPremium: false,
    tags: ["grammar", "writing", "editing"]
  },
  {
    id: "6",
    name: "RunwayML",
    description: "AI-powered video editing and generation tools for creators",
    category: "Video Generation",
    url: "https://runwayml.com",
    rating: 4.4,
    isPremium: true,
    tags: ["video", "editing", "creative"]
  }
];

const categories = [
  "All Categories",
  "Text Generation",
  "Image Generation", 
  "Code Assistant",
  "Writing Assistant",
  "Video Generation",
  "Audio Processing",
  "Data Analysis"
];

const Index = () => {
  const [tools, setTools] = useState<AITool[]>(mockTools);
  const [filteredTools, setFilteredTools] = useState<AITool[]>(mockTools);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    filterTools();
  }, [searchTerm, selectedCategory, tools]);

  const filterTools = () => {
    let filtered = tools;

    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    setFilteredTools(filtered);
  };

  const handleAddTool = (newTool: Omit<AITool, 'id' | 'addedBy'>) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to add new AI tools",
        variant: "destructive"
      });
      return;
    }

    const tool: AITool = {
      ...newTool,
      id: Date.now().toString(),
      addedBy: currentUser || 'Anonymous'
    };

    setTools(prev => [...prev, tool]);
    toast({
      title: "Tool Added Successfully!",
      description: `${tool.name} has been added to AI Galaxy`,
    });
  };

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setCurrentUser(email);
    toast({
      title: "Welcome to AI Galaxy!",
      description: "You're now logged in and can add new AI tools",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Galaxy
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <span className="text-white/80 text-sm">Welcome, {currentUser}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <AuthDialog onLogin={handleLogin}>
                  <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </AuthDialog>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
            Discover AI Tools
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in">
            Explore the universe of artificial intelligence tools. Find, filter, and discover the perfect AI solution for your needs.
          </p>
          
          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AddToolDialog onAddTool={handleAddTool}>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Tool
              </Button>
            </AddToolDialog>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                        {tool.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {tool.category}
                        </Badge>
                        {tool.isPremium && (
                          <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{tool.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-white/70 mb-4">
                    {tool.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-white/20 text-white/60">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No AI tools found matching your criteria.</p>
              <p className="text-white/40 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">
            © 2024 AI Galaxy. Discover the universe of artificial intelligence tools.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
