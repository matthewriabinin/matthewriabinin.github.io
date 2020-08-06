# Shmidt decomposition algorithm. Implementation with examples.

#### September 1, 2020 by [Matvei](/)

## Introduction
A decomposition of the function into some basis gives information about its properties. Common examples are <br/> 
Fourier series decomposition or a Wavelet transform. Here we will explore less known Shmidt decomposition that finds application in quantum physics \[1]. 

## Algorithm
Any complex function of two real variables can be decomposed into orthogonal basis such as: <br/> 

<img src="https://latex.codecogs.com/svg.latex?\Large&space;F(x, y) =\sum_{n} \sqrt{\lambda_{n}} u_{n}(x) v_{n}(y), \ \ \sum_{n}\lambda_{n} = 1" title="\" />

Functions <img src="https://latex.codecogs.com/svg.latex? u_{n}(x)" title="\" /> and <img src="https://latex.codecogs.com/svg.latex? v_{n}(x)" title="\" /> form orthogonal basis and can be found by solving the system of integrodifferential equations:

<img src="https://latex.codecogs.com/svg.latex?\Large&space; \int dx' \rho_{x}(x, x') u_{n}(x') = \lambda_{n} u_{n}(x)" title="\" />
<br/>
<img src="https://latex.codecogs.com/svg.latex?\Large&space; \int dy' \rho_{y}(y, y') v_{n}(y') = \lambda_{n} v_{n}(y)" title="\" />


where matrices <img src="https://latex.codecogs.com/svg.latex? \rho_{x}" title="\" />
and <img src="https://latex.codecogs.com/svg.latex? \rho_{y}" title="\" /> are defined as:

<img src="https://latex.codecogs.com/svg.latex?\Large&space; \rho_{x}(x, x') = \int dy F(x, y)F^{*}(x', y)" title="\" />
<br/>
<img src="https://latex.codecogs.com/svg.latex?\Large&space; \rho_{y}(y, y') = \int dx F(x, y)F^{*}(x, y')" title="\" />

The solution of the equations can be found numerically. Simply, eigenvalues and eigenvectors of the matrix <img src="https://latex.codecogs.com/svg.latex? \rho" title="\" /> form the solution. <br/> The phase between each n'th pair of modes should be taken into account and calculated.
With the phases decomposition takes the form:

<img src="https://latex.codecogs.com/svg.latex?\Large&space;F(x, y) =\sum_{n} \sqrt{\lambda_{n}} u_{n}(x) v_{n}(y) e^{\varphi_{n}}" title="\" /> <br/>
All together, steps of the algorihtm can be described as: <br/>

1. Build matrices <img src="https://latex.codecogs.com/svg.latex? \rho_{x}" title="\" />
 and <img src="https://latex.codecogs.com/svg.latex? \rho_{y}" title="\" /> . <br/>
2. Find their eigenvalues and eigenvectors and normalize them. <br/>
3. For each 'n' find the phase difference <img src="https://latex.codecogs.com/svg.latex? \varphi_{n}" title="\" /> between modes <img src="https://latex.codecogs.com/svg.latex? u_{n}(x)" title="\" /> and <img src="https://latex.codecogs.com/svg.latex? v_{n}(x)" title="\" />. <br/>

The example code for the algorithm is presented below.

```python
import numpy as np
from numpy import linalg as LA


def shmidt_decomp(f, modes_num=40):
    """
    :param f: Complex function of two arguments as 2D array.
    :param modes_num: Number of modes in the decomposition
    :return: modes1, modes2, eigenvalues, phases
    """

    grd = len(f)

    dm1 = np.zeros((grd, grd), dtype=complex)
    dm2 = np.zeros((grd, grd), dtype=complex)

    for i in range(grd):
        for j in range(grd):
            dm1[i, j] = np.trapz(np.multiply(f[i, :], np.conj(f[j, :])))
            dm2[i, j] = np.trapz(np.multiply(f[:, i], np.conj(f[:, j])))

    w1, v1 = LA.eig(dm1)
    w2, v2 = LA.eig(dm2)

    eigvals = w1 / np.sum(w1)
    eigvals = np.abs(eigvals)

    modes1 = np.zeros((modes_num, grd), dtype=complex)
    modes2 = np.zeros((modes_num, grd), dtype=complex)

    for n in range(modes_num):
        modes1[n, :] = v1[:, n] / np.sqrt(np.trapz(np.power(np.abs(v1[:, n]), 2)))
        modes2[n, :] = v2[:, n] / np.sqrt(np.trapz(np.power(np.abs(v2[:, n]), 2)))

    phases = np.zeros(modes_num, dtype=complex)

    for n in range(modes_num):
        prod = np.tensordot(modes1[n, :], modes2[n, :], axes=0)
        phases[n] = np.conjugate(np.trapz(np.trapz(np.multiply(np.conj(f), prod))) / np.sqrt(eigvals[n]))

    return modes1, modes2, eigvals, phases
```

## Example

Down below, there is a simple example of the decomposition for a complex function of two variables.

```python
def f(x, y):
    return np.exp(-(x**2 + y**2)/0.2) * (np.sin(x*y/0.1) + 1j * np.cos(x*y/0.1))

grd = 100
x = np.linspace(-1, 1, grd)
y = np.linspace(-1, 1, grd)

X, Y = np.meshgrid(x, y)
F = f(X, Y)

fig = plt.figure(figsize=(9.4, 14))
plt.subplot(211)
plt.contourf(X, Y, np.real(F), 100, cmap='RdGy')
plt.title('Re[F(x,y)]', fontsize=20)
cbar = plt.colorbar()
cbar.ax.tick_params(labelsize=18)
plt.xlabel('x', fontsize=20)
plt.ylabel('y', fontsize=20)
plt.xticks(fontsize=18)
plt.yticks(fontsize=18)
plt.subplot(212)
plt.contourf(X, Y, np.imag(F), 100, cmap='RdGy')
plt.title('Im[F(x,y)]', fontsize=20)
cbar = plt.colorbar()
cbar.ax.tick_params(labelsize=18)
plt.xlabel('x', fontsize=20)
plt.ylabel('y', fontsize=20)
plt.xticks(fontsize=18)
plt.yticks(fontsize=18)
plt.tight_layout()
plt.show()
```

<img src="static/media/func.79467b4d.png" alt="hi" class="inline"/>

Decomposition function can be used as:

```python
# Decomposition.
modes1, modes2, eigvals, phases = shmidt_decomp(F, modes_num=40)
```

We can visualize resulting modes and eigenvalues.

```python
fig = plt.figure(figsize=(12, 12))
plt.subplot(221)
plt.plot(x, np.abs(modes1[0, :]))
plt.xlabel('X', fontsize=16)
plt.xticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.yticks(fontsize=16)
plt.title("1'st mode.", fontsize=17)
plt.ylabel('|Amplitude|', fontsize=17)
plt.subplot(222)
plt.plot(x, np.abs(modes1[1, :]))
plt.xlabel('X', fontsize=16)
plt.xticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.yticks(fontsize=16)
plt.title("2'nd mode.", fontsize=17)
plt.ylabel('|Amplitude|', fontsize=17)
plt.subplot(223)
plt.plot(x, np.abs(modes1[2, :]))
plt.xlabel('X', fontsize=16)
plt.xticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.yticks(fontsize=16)
plt.title("3'rd mode.", fontsize=17)
plt.ylabel('|Amplitude|', fontsize=17)
plt.subplot(224)
plt.plot(x, np.abs(modes1[3, :]))
plt.xlabel('X', fontsize=16)
plt.xticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.yticks(fontsize=16)
plt.title("4'th mode.", fontsize=17)
plt.ylabel('|Amplitude|', fontsize=17)
plt.tight_layout()
plt.show()


fig2 = plt.figure(figsize=(12, 6))
ev = eigvals[:8]
plt.bar(np.arange(len(ev)), ev)
plt.ylabel(r'Eigenvalues, $\lambda_{n}$', fontsize=18)
plt.xlabel('Mode number, n', fontsize=18)
plt.xticks(fontsize=16)
plt.yticks(fontsize=16)
plt.show()
```

<img src="static/media/modes.7de203f8.png" alt="hi" class="inline"/>
<img src="static/media/eigvalues.34805bfe.png" alt="hi" class="inline"/>

To check if decomposition is correct, it is a good idea to assemble the function back and compare it with the original.

```python
f_combined = np.zeros((grd, grd), dtype=complex)

for n in range(40):
    f_combined += np.sqrt(eigvals[n]) * phases[n] * np.tensordot(modes1[n, :], modes2[n, :], axes=0)

fig = plt.figure(figsize=(9.4, 7))
plt.subplot(221)
plt.contourf(X, Y, np.real(F), 100, cmap='RdGy')
plt.title('Re[F(x,y)], original', fontsize=16)
cbar = plt.colorbar()
cbar.ax.tick_params(labelsize=16)
plt.xlabel('x', fontsize=16)
plt.ylabel('y', fontsize=16)
plt.xticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.yticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.subplot(222)
plt.contourf(X, Y, np.imag(F), 100, cmap='RdGy')
plt.title('Im[F(x,y)], original', fontsize=16)
cbar = plt.colorbar()
cbar.ax.tick_params(labelsize=16)
plt.xlabel('x', fontsize=16)
plt.ylabel('y', fontsize=16)
plt.xticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.yticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.subplot(223)
plt.contourf(X, Y, np.real(f_combined), 100, cmap='RdGy')
plt.title('Re[F(x,y)], assembled', fontsize=16)
cbar = plt.colorbar()
cbar.ax.tick_params(labelsize=16)
plt.xlabel('x', fontsize=16)
plt.ylabel('y', fontsize=16)
plt.xticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.yticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.subplot(224)
plt.contourf(X, Y, np.imag(f_combined), 100, cmap='RdGy')
plt.title('Im[F(x,y)], assembled', fontsize=16)
cbar = plt.colorbar()
cbar.ax.tick_params(labelsize=16)
plt.xlabel('x', fontsize=16)
plt.ylabel('y', fontsize=16)
plt.xticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.yticks([-1.0, -0.5, 0.0, 0.5, 1.0], fontsize=16)
plt.tight_layout()
plt.show()
```

<img src="static/media/assembly.26eea317.png" alt="hi" class="inline"/>

Here it is, both functions are equal ensuring correctness of the decomposition.

## References
- \[1] Dealing with entanglement of continuous variables:
Schmidt decomposition with discrete sets of orthogonal functions. <br/> [https://arxiv.org/pdf/quant-ph/0410167.pdf]
- \[2] Wikipedia. [https://en.wikipedia.org/wiki/Schmidt_decomposition]
