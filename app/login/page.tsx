'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart3, LineChart, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'ceo';
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getRoleIcon = () => {
    switch (role) {
      case 'ceo':
        return <BarChart3 className="h-6 w-6 text-violet-600" />;
      case 'commercial':
        return <Users className="h-6 w-6 text-violet-600" />;
      case 'marketing':
        return <LineChart className="h-6 w-6 text-violet-600" />;
      case 'erp':
        return <Shield className="h-6 w-6 text-violet-600" />;
      default:
        return <BarChart3 className="h-6 w-6 text-violet-600" />;
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'ceo':
        return 'Direction Générale';
      case 'commercial':
        return 'Commercial';
      case 'marketing':
        return 'Marketing';
      case 'erp':
        return 'ERP Assurance';
      default:
        return 'Direction Générale';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
        role: role.toUpperCase(),
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        transformRequest: [(data) => {
          const params = new URLSearchParams();
          for (const key in data) {
            params.append(key, data[key]);
          }
          return params;
        }],
      });

      const data = response.data;
      console.log('Réponse du backend:', data);

      if (data.success) {
        toast({
          title: 'Connexion réussie',
          description: `Bienvenue dans l'espace ${getRoleTitle()}`,
        });
        router.push(`/${role}/dashboard`);
      } else {
        toast({
          title: 'Erreur de connexion',
          description: data.message || 'Email, mot de passe ou rôle incorrect',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      toast({
        title: 'Erreur de connexion',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 to-white p-4">
      <Card className="w-full max-w-md border-violet-200">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">{getRoleIcon()}</div>
          <CardTitle className="text-2xl text-center text-violet-900">Connexion {getRoleTitle()}</CardTitle>
          <CardDescription className="text-center">Entrez vos identifiants pour accéder à votre espace</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@assurcrm.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-sm text-violet-600 hover:text-violet-800">
                  Mot de passe oublié?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
              Se connecter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}