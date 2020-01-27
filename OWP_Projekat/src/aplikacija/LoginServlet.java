package aplikacija;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.KorisnikDAO;
import model.Korisnik;

public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		try {
			Korisnik korisnik = KorisnikDAO.get(username, password);
			if (korisnik == null) {
				request.getRequestDispatcher("./FailServlet").forward(request, response);
				return;
			}
			
			request.getRequestDispatcher("./SuccessServlet").forward(request, response);
			return;
			} catch (Exception ex) {
			ex.printStackTrace();
		}
		

		
	}

}
