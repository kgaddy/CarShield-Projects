import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  form: FormGroup;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    })

  }

  ngOnInit(): void {
    //???
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const payload = this.buildLoginPayload();

    this.authService.login(payload.email ?? '', payload.password ?? '').subscribe({
      next: (user) => {
        // Success - navigate to home
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error: (error) => {
        // Error - show message
        this.errorMessage = 'Invalid login';
        this.isLoading = false;
      }
    });
  }

  private toOptionalString(value: string | null | undefined): string | undefined {
    if (value === null || value === undefined) {
      return undefined;
    }

    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
  }

  private buildLoginPayload(): Partial<LoginRequest> {
    const raw = this.form.getRawValue();
    const payload: Partial<LoginRequest> = {
      email: this.toOptionalString(raw.email),
      password: this.toOptionalString(raw.password)
    };
    return payload;
  }
}
