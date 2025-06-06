
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AITool {
  name: string;
  description: string;
  category: string;
  url: string;
  rating: number;
  isPremium: boolean;
  tags: string[];
}

interface AddToolDialogProps {
  children: React.ReactNode;
  onAddTool: (tool: AITool) => void;
}

const categories = [
  "Text Generation",
  "Image Generation", 
  "Code Assistant",
  "Writing Assistant",
  "Video Generation",
  "Audio Processing",
  "Data Analysis"
];

const AddToolDialog = ({ children, onAddTool }: AddToolDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    url: "",
    rating: 5,
    isPremium: false,
    tags: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category || !formData.url) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const tool: AITool = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      url: formData.url,
      rating: formData.rating,
      isPremium: formData.isPremium,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    onAddTool(tool);
    setIsOpen(false);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      url: "",
      rating: 5,
      isPremium: false,
      tags: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Add New AI Tool</DialogTitle>
          <DialogDescription className="text-white/70">
            Share an amazing AI tool with the community
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tool-name" className="text-white">Tool Name *</Label>
            <Input
              id="tool-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              placeholder="e.g., ChatGPT"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool-description" className="text-white">Description *</Label>
            <Textarea
              id="tool-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              placeholder="Describe what this AI tool does..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool-category" className="text-white">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool-url" className="text-white">Website URL *</Label>
            <Input
              id="tool-url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool-rating" className="text-white">Rating (1-5)</Label>
            <Input
              id="tool-rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool-tags" className="text-white">Tags (comma-separated)</Label>
            <Input
              id="tool-tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              placeholder="e.g., chatbot, writing, coding"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="tool-premium"
              checked={formData.isPremium}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPremium: checked }))}
            />
            <Label htmlFor="tool-premium" className="text-white">Premium Tool</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Add Tool
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToolDialog;
